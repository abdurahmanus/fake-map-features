import React from "react";
import styled from "styled-components";

const Avatar = styled.img`
  border-radius: 100%;
`;

const User = ({ className, user, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <Avatar height="50" src={user.avatar} alt="" /> {user.userName}{" "}
      {user.email}
    </div>
  );
};

const StyledUser = styled(User)`
  background: ${props => (props.selected ? "red" : "green")};
  cursor: pointer;
  &:hover {
    background: blue;
  }
`;

export default StyledUser;
