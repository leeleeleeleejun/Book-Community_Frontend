import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  border-bottom: 1px solid var(--color-gray-3);
  padding-bottom: 8px;
  height: 27px;

  button {
    padding: 4px 12px;
    background: none;
    border: 1px solid var(--color-gray);
    border-radius: 8px;
    font-size: var(--font-semi-small);
  }
`;

export const NavItem = styled(Link)<{ $active: boolean }>`
  color: black;
  font-size: 21px;
  font-weight: var(--weight-semi-bold);
  padding: 7px;
  text-decoration: none;
  margin-right: 10px;

  ${({ $active }) => $active && "border-bottom: 4px solid black;"}
`;
