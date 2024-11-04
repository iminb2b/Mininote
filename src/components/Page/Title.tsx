import { NodeData } from "@/types/nodeType";
import { css } from "@emotion/react";
import {
  FC,
  FormEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { nanoid } from "nanoid";

type TitleProps = {
  title: string;
  changPageTitle: (title: string) => void;
  addNode: (params: { node: NodeData; index: number }) => void;
};

const container = css``;
const titleText = css``;

const Title: FC<TitleProps> = ({ title, changPageTitle, addNode }) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isFocused = document.activeElement === headerRef.current;

    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);

  const onInput: FormEventHandler<HTMLHeadingElement> = useCallback(
    (event) => {
      changPageTitle(event.currentTarget.textContent || "");
    },
    [changPageTitle],
  );

  const onKeyDown: KeyboardEventHandler<HTMLHeadingElement> = useCallback(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addNode({ node: { type: "text", id: nanoid(), value: "" }, index: 0 });
      }
    },
    [addNode],
  );

  return (
    <div css={container}>
      <h1
        css={titleText}
        contentEditable
        suppressContentEditableWarning
        onInput={onInput}
        onKeyDown={onKeyDown}
      ></h1>
    </div>
  );
};

export default Title;
