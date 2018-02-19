import React, { PureComponent } from "react";
import styled from "styled-components";
import Email from "./Email";

const Avatar = styled.img`
  border-radius: 100%;
  vertical-align: middle;
  margin-right: 6px;
`;

const Name = styled.span`
  line-height: 50px;
  vertical-align: middle;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
`;

class User extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.user.id);
  }

  render() {
    const { className, user } = this.props;
    return (
      <button className={className} onClick={this.handleClick}>
        <div>
          <Avatar height="50" width="50" src={user.avatar} alt="User avatar" />
          <Name>{user.userName}</Name>
        </div>
        <Email email={user.email} />
      </button>
    );
  }
}

const StyledUser = styled(User)`
  border: none;
  background: white;
  display: block;
  text-align: left;
  border-left: ${({ selected }) =>
    selected ? "6px solid #ff31f9" : "6px solid transparent"};
  width: 100%;
  padding: 4px;
  cursor: pointer;
  &:hover {
    border-left: ${({ selected }) =>
      selected ? "6px solid #ff31f9" : "6px solid #ff81fb"};
  }
`;

export default StyledUser;
