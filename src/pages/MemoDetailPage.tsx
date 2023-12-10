import { useEffect, useState } from "react";
import LeftArrowIcon from "@/assets/LeftArrowIcon";
import { useNavigate, NavigateFunction, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMemo } from "@/api/memoAPI";
import { memo } from "@/types";
import getDateFunc from "@/utils/getDate";

const MemoDetailPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const { _id } = useParams();
  const [memo, setMemo] = useState<memo>();

  useEffect(() => {
    (async () => {
      if (!_id) return;
      const response = await getMemo(_id);
      setMemo({
        ...response.memo,
        createdAt: getDateFunc(response.memo.createdAt),
      });
    })();
  }, []);

  return (
    <>
      <MemoHeader>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftArrowIcon />
        </button>
        <MemoTitle>{memo?.title}</MemoTitle>
        <Writer>
          <i>by</i>
          {(memo?.author && memo.author.nickname) || "user"}
        </Writer>
        <WriteDate>
          {memo?.createdAt && memo.createdAt.slice(0, 10)}{" "}
          {memo?.createdAt && memo.createdAt.slice(11, 16)}
        </WriteDate>
      </MemoHeader>
      {memo?.book_info && (
        <BookBox>
          <BoolTitle>{memo.book_info.title}</BoolTitle>
          <BookImg src={memo.book_info.cover} />
        </BookBox>
      )}

      <Article>{memo?.content || ""}</Article>
    </>
  );
};

export default MemoDetailPage;

const MemoHeader = styled.div`
  width: 90%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
  border-bottom: 1px solid var(--color-gray-3);

  button {
    margin-left: 10px;
    margin-right: auto;
    margin-bottom: 20px;
  }
`;

const MemoTitle = styled.h3`
  font-size: var(--font-large);
  font-weight: var(--weight-semi-bold);
  word-break: break-word;
  margin-bottom: 5px;
`;

const Writer = styled.span`
  font-size: var(--font-micro);
  color: var(--color-gray);
  font-weight: var(--weight-regular);
  i {
    font-style: italic;
    margin-right: 5px;
  }
`;

const WriteDate = styled.span`
  font-size: var(--font-micro);
  font-weight: var(--weight-regular);

  color: var(--color-light-black);
`;

const BookBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 40px;
`;

const BoolTitle = styled.h4`
  font-weight: var(--weight-semi-bold);
  text-align: center;
`;

const BookImg = styled.img`
  width: 120px;
  border-radius: 4px;
  box-shadow: 0 0 5px #0006;
  margin: 20px auto 40px;
`;

const ArticleWrap = styled.div`
  width: 90%;
  padding: 30px 20px;
  margin: 0 auto;
  line-height: initial;
  h1 {
    display: block;
    font-size: 2em;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }
  h2 {
    display: block;
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  h3 {
    display: block;
    font-size: 1.17em;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  h4 {
    display: block;
    font-size: 1em;
    margin-top: 1.33em;
    margin-bottom: 1.33em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  h5 {
    display: block;
    font-size: 0.83em;
    margin-top: 1.67em;
    margin-bottom: 1.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  h6 {
    display: block;
    font-size: 0.67em;
    margin-top: 2.33em;
    margin-bottom: 2.33em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  strong {
    font-weight: bold;
  }

  ol {
    display: block;
    list-style-type: decimal;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-top: 1em;
    margin-bottom: 1 em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
  }

  em {
    font-style: italic;
  }

  blockquote {
    display: block;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 40px;
    margin-right: 40px;
  }

  @media (max-width: 768px) {
    img {
      max-width: 300px;
    }
  }
`;

const Article = ({ children }: { children: string }) => {
  return <ArticleWrap dangerouslySetInnerHTML={{ __html: children }} />;
};
