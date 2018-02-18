const FETCH_FEATURES = "FETCH_FEATURES";
const FEATURES_RESULT = "FEATURES_RESULT";
const SELECT_USER = "SELECT_USER";

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

const selectUser = (id) => ({
  type: SELECT_USER,
  id
})

export { FETCH_FEATURES, FEATURES_RESULT, SELECT_USER, fetchFeatures, selectUser };
