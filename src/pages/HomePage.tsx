import { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "@/components/common/Nav";
import MemoList from "@/components/memo/MemoList";
import UpArrow from "@/assets/UpArrow.svg?react";

const HomePage = () => {
  const [position, setPosition] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | null;

    const handleScroll = () => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          const moving = window.scrollY;
          setVisible(position > moving);
          setPosition(moving);
        }, 200);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);

  return (
    <>
      <TopButton
        $visible={visible}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <UpArrow />
      </TopButton>
      <Nav />
      <MemoList user={""} />
    </>
  );
};

export default HomePage;

const TopButton = styled.button<{ $visible: boolean }>`
  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  right: 50%;
  bottom: ${({ $visible }) => ($visible ? "30px" : "-40px")};

  border-radius: 50%;
  background-color: var(--color-sub);
  opacity: 0.5;

  z-index: 8;
  cursor: pointer;
  transition: bottom 0.3s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;
