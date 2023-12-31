import { styled } from "styled-components";
import MinusIcon from "@/assets/MinusIcon.svg?react";

const BookItem = ({
  deleteFunc,
  cancelFunc,
  cover,
  title,
}: {
  deleteFunc?: (cover: string, title: string) => void;
  cancelFunc?: () => void;
  cover: string;
  title: string;
}) => {
  return (
    <>
      <BookItemBox>
        <MinusButton
          onClick={() => {
            deleteFunc && deleteFunc(cover, title);
            cancelFunc && cancelFunc();
          }}
        >
          <MinusIcon />
        </MinusButton>
      </BookItemBox>
      <BookImg src={cover} />
      <BookTitle>{title}</BookTitle>
    </>
  );
};

export default BookItem;

const BookItemBox = styled.div`
  position: absolute;
  display: flex;
  background-color: rgba(0, 0, 0, 0.4);
  width: 98px;
  height: 142px;
  opacity: 0;
  border-radius: 4px;

  color: white;
  font-size: 20px;
  font-weight: 800;

  &:hover {
    opacity: 1;
  }
`;

const MinusButton = styled.button`
  display: flex;
  min-width: 30px;
  min-height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: var(--color-sub);
  margin: auto;
  opacity: 0.7;
`;

const BookImg = styled.img`
  width: 98px;
  height: 142px;
  border-radius: 4px;
`;

const BookTitle = styled.div`
  max-height: 31.2px;
  height: 31.2px;
  font-size: var(--font-micro);
  font-weight: var(--weight-regular);
  padding: 0 2px;
  margin: 4px auto;
  line-height: 1.3;

  display: -webkit-box;
  display: -ms-flexbox;
  text-overflow: ellipsis;

  overflow: hidden;

  word-break: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
