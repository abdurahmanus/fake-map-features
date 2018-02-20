import React, { PureComponent } from "react";
import styled from "styled-components";
import Email from "./Email";
import styles from "./styles";

const UserName = styled.div`
  ${styles.fonts};
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
