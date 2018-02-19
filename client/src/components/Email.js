import React from "react";
import styled from "styled-components";
import mailIcon from "./mail.svg";

const EmailIcon = styled.img`
  vertical-align: middle;
  margin-right: 4px;
`;

const EmailText = styled.span`
  line-height: 16px;
  vertical-align: middle;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
`;

const Email = ({email}) => (<div>
  <EmailIcon width="14" height="16" src={mailIcon} alt="Email icon" />
  <EmailText>{email}</EmailText>
</div>)

export default Email;
