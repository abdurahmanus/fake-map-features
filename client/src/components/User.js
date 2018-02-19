import React from "react";
import styled from "styled-components";

const Avatar = styled.img`
  border-radius: 100%;
`;

const User = ({ className, user, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <Avatar height="50" src={user.avatar} alt="" /> {user.userName}{" "}
      {user.email}
    </button>
  );
};

const StyledUser = styled(User)`
  border: none;
  display: block;
  text-align: left;
  background: ${props => (props.selected ? "red" : "green")};
  cursor: pointer;
  &:hover {
    background: red;
  }
`;

export default StyledUser;
