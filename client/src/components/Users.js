import React from "react";
import styled from "styled-components";
import User from "./User";

const Users = ({ className, users, selectedUser, onSelectUser }) => {
  return (
    <ul className={className}>
      {users.map(user => (
        <li key={user.id}>
          <User user={user} selected={selectedUser === user.id} onClick={() => onSelectUser(user.id)} />
        </li>
      ))}
    </ul>
  );
};

const StyledUsers = styled(Users)`
  list-style: none;
  padding: 0;
`;

export default StyledUsers;
