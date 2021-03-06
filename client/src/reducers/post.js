import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_POST,
  SET_EDIT_POST,
  UPDATE_COMMENT,
  SET_EDIT_COMMENT,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_ERROR,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
  editedPost: null,
  editedComment: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
    case UPDATE_POST:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
    case UPDATE_COMMENT:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
        result: payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false,
      };
    case UPLOAD_IMAGE_ERROR:
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id
            ? {
                ...post,
                likes: payload.likes,
              }
            : post,
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload,
        },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(comment => comment._id !== payload),
        },
        loading: false,
      };
    case SET_EDIT_POST:
      return {
        ...state,
        editedPost: payload,
      };
    case SET_EDIT_COMMENT:
      return {
        ...state,
        editedComment: payload,
      };
    default:
      return state;
  }
}
