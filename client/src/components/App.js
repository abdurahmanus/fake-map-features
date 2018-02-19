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
`;

class App extends Component {
  componentDidMount() {
    this.props.fetchFeatures();
  }

  render() {
    const { className, users, features, selectedUser, selectUser } = this.props;
    return (
      <div className={className}>
        <AppUsers
          users={users}
          selectedUser={selectedUser}
          onSelectUser={selectUser}
        />
        <AppMap features={features} selected={selectedUser} />
      </div>
    );
  }
}

const AppStyled = styled(App)`
  display: flex;
  height: 100vh;
`;

const AppContainer = connect(
  state => ({
    isLoading: state.isLoading,
    features: state.features,
    selectedUser: state.selectedUser,
    users: state.users
  }),
  { fetchFeatures, selectUser }
)(AppStyled);

export default AppContainer;
