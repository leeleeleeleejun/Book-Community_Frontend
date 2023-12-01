import styled from "styled-components";
import FormButton from "@/components/common/FormButton";

export const TimeBox = styled.div`
  font-size: 250px;
  text-align: center;
  margin: 130px 0;
  font-family: "Dongle", sans-serif;
`;

export const ButtonBox = styled.div`
  display: flex;
`;

export const StartButton = styled(FormButton)`
  height: 70px;
  width: 160px;
  font-size: var(--font-medium);
  padding: 60px auto;
`;
export const PauseButton = styled(StartButton)`
  background-color: var(--color-gray);
  &:hover {
    background-color: var(--color-gray-4);
  }
`;
export const StoptButton = styled(StartButton)`
  background-color: var(--color-brown);
  &:hover {
    background-color: var(--color-brown-2);
  }
`;
