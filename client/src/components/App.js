import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchFeatures, selectUser } from "../actions";
import Users from "./Users";
import OlMap from "./OlMap";

const AppUsers = styled(Users)`
  overflow-y: auto;
  width: 300px;
  margin: 0;
`;

const AppMap = styled(OlMap)`
  flex-grow: 1;
`

class App extends Component {
  componentDidMount() {
    this.props.fetchFeatures();
  }

  render() {
    const { className, users, features, selectedUser, selectUser } = this.props;
    return (
      <div className={className}>
        <AppUsers users={users} selectedUser={selectedUser} onSelectUser={selectUser} />
        <AppMap features={features} selected={selectedUser} />
      </div>
    );
  }
}

const AppStyled = styled(App)`
  background: lightgray;
  display: flex;
  height: 100vh;
`;

const getUsers = features => (features ? features.map(f => ({
  id: f.properties.id,
  userName: f.properties.userName,
  avatar: f.properties.avatar,
  email: f.properties.email
})) : []);

const AppContainer = connect(
  state => ({
    isLoading: state.isLoading,
    features: state.features,
    selectedUser: state.selectedUser,
    users: getUsers(state.features.features)
  }),
  { fetchFeatures, selectUser }
)(AppStyled);

export default AppContainer;
