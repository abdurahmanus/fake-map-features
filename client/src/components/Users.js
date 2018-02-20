import React, { PureComponent } from "react";
import styled from "styled-components";
import User from "./User";

class Users extends PureComponent {
  render() {
    const { className, users, selectedUser, onSelectUser } = this.props;
    return (
      <ul className={className}>
        {users.map(user => (
          <li key={user.id}>
            <User
              user={user}
              selected={selectedUser === user.id}
              onClick={onSelectUser}
            />
          </li>
        ))}
      </ul>
    );
  }
}

const StyledUsers = styled(Users)`
  list-style: none;
  padding: 0;
`;

export default StyledUsers;
