import React from "react";
import styled from "styled-components";
import Email from "./Email";

const UserName = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`;

const UserInfo = ({ className, user }) => (
  <div className={className}>
    <UserName>{user.userName}</UserName>
    <Email email={user.email} />
  </div>
);

export default UserInfo;
