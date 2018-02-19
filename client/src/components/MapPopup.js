import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  background-color: white;
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
  &:after,
  &:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  &:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
`;

const Closer = styled.button`
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 2px;
  border: none;
  background: none;
  cursor: pointer;
  &:after {
    content: "✖";
  }
`;

class MapPopup extends Component {
  constructor(props) {
    super(props);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  componentDidMount() {
    // hack: react's onClick doesn't work if overlay's stopEvent prop is true(default)
    findDOMNode(this.closerRef).addEventListener(
      "click",
      this.handleCloseClick
    );
  }

  componentWillUnmount() {
    findDOMNode(this.closerRef).removeEventListener(
      "click",
      this.handleCloseClick
    );
  }

  handleCloseClick() {
    this.props.onClose();
    return false;
  }

  render() {
    const { children } = this.props;
    return (
      <Container>
        <Closer ref={el => (this.closerRef = el)} />
        {children}
      </Container>
    );
  }
}

export default MapPopup;
