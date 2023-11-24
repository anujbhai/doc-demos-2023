import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  selectCount,
  selectFetchStatus
} from "../counterSlice"

export function Counter() {
  const count = useSelector(selectCount)
  const fetchStatus = useSelector(selectFetchStatus)
  const dispatch = useDispatch()

  const [incrementAmount, setIncrementAmount] = useState(0)

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <button
        onClick={() => dispatch(increment())}
      >+</button>

      <div>
        <span>{fetchStatus === 'idle' ? count : `${fetchStatus} ...`}</span>
      </div>

      <button
        onClick={() => dispatch(decrement())}
      >-</button>

      <div>
        <p>Increment by amount - </p>
        <input
          aria-label="Set Increment Amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >+</button>
      </div>

      <div>
        <button
          onClick={() => dispatch(incrementAsync())}
        >Add async</button>
      </div>
    </div>
  )
}

