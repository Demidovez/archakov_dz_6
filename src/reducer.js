import React from "react";

export const ContextApp = React.createContext();

export const initialState = {
  articles: [],
  articleComments: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ALL_ARTICLES":
      return {
        ...state,
        articles: action.payload.sort((prevArt, nextArt) => nextArt.id - prevArt.id),
      };
    case "ADD_COMMENTS":
      return {
        ...state,
        articleComments: {
          ...state.articleComments,
          [action.payload.articleId]: action.payload.comments,
        },
      };
    case "ADD_ARTICLE":
      return {
        ...state,
        articles: [action.payload, ...state.articles],
      };
    case "REMOVE_ARTICLE":
      return {
        ...state,
        articles: [...state.articles.filter((article) => article.id !== action.payload)],
        articleComments: {
          ...state.articleComments,
          [action.payload]: null,
        },
      };
    case "EDIT_ARTICLE":
      return {
        ...state,
        articles: [
          ...state.articles.map((article) =>
            article.id === action.payload.id ? action.payload : article,
          ),
        ],
      };
    default:
      return state;
  }
};
