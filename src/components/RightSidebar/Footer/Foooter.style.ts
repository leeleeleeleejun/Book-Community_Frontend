import styled from "styled-components";

export const FooterBox = styled.footer`
  margin-top: auto;
  color: var(--color-light-black);
  font-size: var(--font-small);

  p {
    line-height: 1.3;
    white-space: pre;
  }

  div {
    margin-top: 5px;
  }
`;

export const IconBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  gap: 25px;
`;
