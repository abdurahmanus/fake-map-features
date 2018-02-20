import {
  FETCH_FEATURES,
  FEATURES_RESULT,
  SELECT_USER
} from "./actionTypes";

const getUsers = features => features.map(f => ({
  id: f.properties.id,
  userName: f.properties.userName,
  avatar: f.properties.avatar,
  email: f.properties.email
}));

const rootReducer = (
  state = {
    features: {},
    users: []
  },
  action
) => {
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
        features: action.features,
        users: getUsers(action.features.features)
      };
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.id
      };
    default:
      return state;
  }
};

export default rootReducer;
