import { FETCH_FEATURES, FEATURES_RESULT, SELECT_USER } from "./actionTypes";

const fetchFeatures = () => dispatch => {
  dispatch({ type: FETCH_FEATURES });

  fetch("./features")
    .then(res => res.json())
    .then(features =>
      dispatch({
        type: FEATURES_RESULT,
        features
      })
    );
};

const selectUser = id => ({
  type: SELECT_USER,
  id
});

export { fetchFeatures, selectUser };
