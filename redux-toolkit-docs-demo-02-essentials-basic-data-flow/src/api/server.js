import { rest, setupWorker } from 'msw'
import { factory, primaryKey, manyOf, oneOf } from '@mswjs/data'
import { faker } from '@faker-js/faker'
import { nanoid } from '@reduxjs/toolkit'
import { Server as MockSocketServer } from 'mock-socket'
import { setRandom } from 'txtgen'
import seedRandom from 'seed-random'
import { parseISO } from 'date-fns'

const NUM_USERS = 3
const POSTS_PER_USER = 3
const RECENT_NOTIFICATIONS_DAYS = 7

// Extra delay for showing the loading spinner
const DELAY_MS = 2000

// Set up a seeded random number generator, so that we get
// a consistent set of users / entries each time the page loads.
// This can be reset by deleting this localStorage value,
// or turned off by setting `useSeededRNG` to false.
let useSeededRNG = true
let rng = seedRandom()

if (useSeededRNG) {
  let randomSeedStr = localStorage.getItem('randomTimestampSeed')
  let seedDate

  if (randomSeedStr) {
    seedDate = new Date(randomSeedStr)
  } else {
    seedDate = new Date()
    randomSeedStr = seedDate.toISOString()
    localStorage.setItem('randomTimestampSeed', randomSeedStr)
  }

  rng = seedRandom(randomSeedStr)
  setRandom(rng)
  faker.seed(seedDate.getTime())
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(rng() * (max - min + 1)) + min
}

function randomFromArray(arr) {
  return arr[getRandomInt(0, arr.length - 1)]
}

/* MSW data model setup */
export const db = factory({
  user: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    name: String,
    username: String,
    posts: manyOf('post'),
  },
  post: {
    id: primaryKey(nanoid),
    title: String,
    date: String,
    content: String,
    reactions: oneOf('reaction'),
    comments: manyOf('comment'),
    user: oneOf('user'),
  },
  comment: {
    id: primaryKey(String),
    date: String,
    text: String,
    post: oneOf('post'),
  },
  reaction: {
    id: primaryKey(nanoid),
    thumbsUp: Number,
    hooray: Number,
    heart: Number,
    rocket: Number,
    eyes: Number,
    post: oneOf('post'),
  },
})

const createUserData = () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    username: faker.internet.userName(),
  }
}

const createPostData = (user) => {
  return {
    title: faker.lorem.words(),
    date: faker.date.recent({ days: RECENT_NOTIFICATIONS_DAYS }).toISOString(),
    user,
    content: faker.lorem.paragraphs(),
    reactions: db.reaction.create(),
  }
}

// Create an initial set of users and posts
for (let i = 0; i < NUM_USERS; i++) {
  const author = db.user.create(createUserData())

  for (let j = 0; j < POSTS_PER_USER; j++) {
    const newPost = createPostData(author)
    db.post.create(newPost)
  }
}

const serializePost = (post) => ({
  ...post,
  user: post.user.id,
})

/* MSW REST API HANDLERS */
export const handlers = [
  rest.get('/fakeApi/posts', (_, res, ctx) => {
    const posts = db.post.getAll().map(serializePost)
    return res(ctx.delay(DELAY_MS), ctx.json(posts))
  }),
  rest.post('/fakeApi/posts', (req, res, ctx) => {
    const data = req.json()

    if (data.content === 'error') {
      return res(
        ctx.delay(DELAY_MS),
        ctx.status(500),
        ctx.json({ error: 'Internal Server Error' })
      )
    }

    data.date = new Date().toISOString()

    const user = db.user.findFirst({ where: { id: { equals: data.user } }, })
    data.user = user
    data.reactions = db.reaction.create()

    const post = db.post.create(data)
    return res(ctx.delay(DELAY_MS), ctx.json({ post: serializePost(post) }))
  }),
  rest.get('/fakeApi/posts/:id', (req, res, ctx) => {
    const post = db.post.findFirst({ where: { id: { equals: req.params.id } }, })

    return res(ctx.delay(DELAY_MS), ctx.json({ post: serializePost(post) }))
  }),
  rest.patch('/fakeApi/posts/:id', (req, res, ctx) => {
    // eslint-disable-next-line no-unused-vars
    const { id, ...data } = req.json()
    const updatedPost = db.post.update({
      where: { id: { equals: req.params.id } },
      data,
    })

    return res(ctx.delay(DELAY_MS), ctx.json({ post: serializePost(updatedPost) }))
  }),
  rest.get('/fakeApi/posts/:id/comments', (req, res, ctx) => {
    const post = db.post.findFirst({
      where: { id: { equals: req.params.id } },
    })

    return res(
      ctx.delay(DELAY_MS),
      ctx.json({ comments: post.comments })
    )
  }),
  rest.post('/fakeApi/posts/:id/reactions', (req, res, ctx) => {
    const postId = req.params.id
    const reaction = req.json().then((reaction) => reaction.reaction)
    const post = db.post.findFirst({ where: { id: { equals: postId } }, })
    const updatedPost = db.post.update({
      where: { id: { equals: postId } },
      data: {
        reactions: {
          ...post.reactions,
          [reaction]: (post.reactions[reaction] || 0 + 1)
        }
      },
    })

    return res(ctx.delay(DELAY_MS), ctx.json({ post: serializePost(updatedPost) }))
  }),
  rest.get('/fakeApi/notifications', (_, res, ctx) => {
    const numNotifications = getRandomInt(1, 5)

    let notifications = generateRandomNotifications(
      undefined,
      numNotifications,
      db,
    )

    return res(ctx.delay(DELAY_MS), ctx.json({ notifications }))
  }),
  rest.get('/fakeApi/users', (_, res, ctx) => {
    return res(ctx.delay(DELAY_MS), ctx.json(db.user.getAll()))
  })
]

export const worker = setupWorker(...handlers)

const socketServer = new MockSocketServer('ws://localhost:3000')

let currentSocket

const sendMessage = (socket, obj) => {
  socket.send(JSON.stringify(obj))
}

// Allow server to fake sending a notification
const sendRandomNotification = (socket, since) => {
  const numNotifications = getRandomInt(1, 5)
  const notifications = generateRandomNotifications(
    since,
    numNotifications,
    db,
  )

  sendMessage(socket, {
    type: 'notifications',
    payload: notifications,
  })
}

export const forceGenerateNotifications = since => {
  sendRandomNotification(currentSocket, since)
}

socketServer.on('connection', (socket) => {
  currentSocket = socket

  socket.on('message', (data) => {
    const message = JSON.parse(data)

    switch (message.type) {
      case 'notifications': {
        const since = message.payload
        sendRandomNotification(socket, since)
        break
      }
      default:
        break
    }
  })
})

const notificationTemplates = [
  'poked you',
  'says hi!',
  'wants to be friends',
  'sent you a gift',
]

const generateRandomNotifications = (since, numNotifications, db) => {
  const now = new Date()

  let pastDate

  if (since) {
    pastDate = parseISO(since)
  } else {
    pastDate = new Date(now.valueOf())
    pastDate.setMinutes(pastDate.getMinutes() - 5)
  }

  /*
   * Create N random notifications.
   * Do not save in DB, just generator a new batch and return
  */
  const notifications = [...Array(numNotifications)]
    .map(() => {
      const user = randomFromArray(db.user.getAll())
      const template = randomFromArray(notificationTemplates)

      return {
        id: nanoid(),
        date: faker.date.between({ from: pastDate, to: now }).toISOString(),
        user: user.id,
        message: template,
      }
    })

  return notifications
}
