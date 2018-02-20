import React from "react";
import styled from "styled-components";
import Email from "./Email";
import styles from "./styles";

const UserName = styled.div`
  ${styles.fonts};
`;

const UserInfo = ({ className, user }) => (
  <div className={className}>
    <UserName>{user.userName}</UserName>
    <Email email={user.email} />
  </div>
);

export default UserInfo;
