import { AppContext } from "@/context/AppContext";
import { NodeData } from "@/types/nodeType";
import { nanoid } from "nanoid";
import {
  FC,
  FormEventHandler,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

const BasicNode: FC<{
  node: NodeData;
  updateFocusedIndex: (index: number) => void;
  isFocused: boolean;
  index: number;
}> = ({ node, updateFocusedIndex, isFocused, index }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node, isFocused, nodeRef]);

  const handleInput: FormEventHandler<HTMLDivElement> = useCallback(
    ({ currentTarget }) => {
      const { textContent } = currentTarget;

      dispatch({
        type: "changeNodeValue",
        nodeIndex: index,
        value: textContent || "",
      });
    },
    [dispatch, index],
  );

  const handleClick = useCallback(() => {
    updateFocusedIndex(index);
  }, [index, updateFocusedIndex]);

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const target = event.target as HTMLDivElement;

      if (event.key === "Enter") {
        event.preventDefault();
        if (target.textContent?.[0] === "/") {
          return;
        }

        dispatch({
          type: "addNode",
          node: { type: node.type, value: "", id: nanoid() },
          index: index + 1,
        });

        updateFocusedIndex(index + 1);
      }

      if (event.key === "Backspace") {
        if (target.textContent?.length === 0) {
          event.preventDefault();
          dispatch({ type: "removeNodeByIndex", nodeIndex: index });
          updateFocusedIndex(index - 1);
        } else if (window?.getSelection()?.anchorOffset === 0) {
          event.preventDefault();
          dispatch({ type: "removeNodeByIndex", nodeIndex: index - 1 });
          updateFocusedIndex(index - 1);
        }
      }
    },
    [dispatch, index, node.type, updateFocusedIndex],
  );

  return (
    <div
      onInput={handleInput}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      ref={nodeRef}
      contentEditable
      suppressContentEditableWarning
    ></div>
  );
};

export default BasicNode;
