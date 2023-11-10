import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { NavLink, useParams } from "react-router-dom";

import { selectUserById } from "../usersSlice";
import { useGetPostQuery } from "../../api/apiSlice";

const UserPage = () => {
  const {userId} = useParams();
  const user = useSelector((state) => selectUserById(state, userId));
  const selectPostsForUser = useMemo(() => {
    return createSelector(
      res => res.data,
      (res, userId) => userId,
      (data, userId) => data.filter(post => post.user === userId)
    )
  }, []);
  const {postsForUser} = useGetPostQuery(undefined, {
    selectFromResult: (res) => ({
      ...res,
      postsForUser: selectPostsForUser(res, userId),
    })
  });
  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <NavLink to={`/posts/${post.id}`}>
        {post.title}
      </NavLink>
    </li>
  ));

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};

export default UserPage;
