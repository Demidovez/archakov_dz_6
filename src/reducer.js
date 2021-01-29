import React from "react";

export const ContextApp = React.createContext();

export const initialState = {
  posts: [],
  postComments: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ALL_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "ADD_COMMENTS":
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [action.payload.postId]: action.payload.comments,
        },
      };
    case "ADD_ARTICLE":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
};
