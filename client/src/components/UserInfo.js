import React, { PureComponent } from "react";
import styled from "styled-components";
import Email from "./Email";

const UserName = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`;

class UserInfo extends PureComponent {
  render() {
    const { className, user } = this.props;
    return (
      <div className={className}>
        <UserName>{user.userName}</UserName>
        <Email email={user.email} />
      </div>
    );
  }
}

export default UserInfo;
