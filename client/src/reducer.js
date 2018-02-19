import { FETCH_FEATURES, FEATURES_RESULT, SELECT_USER } from "./actionTypes";

const rootReducer = (state = {
    features: {}
}, action) => {
  switch (action.type) {
    case FETCH_FEATURES:
      return {
          ...state,
          isLoading: true
      };
    case FEATURES_RESULT:
      return {
          ...state,
          isLoading: false,
          features: action.features
      }
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.id
      }
    default:
      return state;
  }
};

export default rootReducer;
