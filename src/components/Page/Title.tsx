import { css } from "@emotion/react";
import {
  FC,
  FormEventHandler,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { nanoid } from "nanoid";
import { AppContext } from "@/context/AppContext";

const container = css``;
const titleText = css``;

const Title: FC = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const {
    state: {
      page: { title },
    },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    const isFocused = document.activeElement === headerRef.current;

    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);

  const onInput: FormEventHandler<HTMLHeadingElement> = useCallback(
    (event) => {
      dispatch({
        type: "setTitle",
        title: event.currentTarget.textContent || "",
      });
    },
    [dispatch],
  );

  const onKeyDown: KeyboardEventHandler<HTMLHeadingElement> = useCallback(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        dispatch({
          type: "addNode",
          node: { type: "text", id: nanoid(), value: "" },
          index: 0,
        });
      }
    },
    [dispatch],
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
