import { NodeData } from "@/types/nodeType";
import { nanoid } from "nanoid";
import {
  FC,
  FormEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
} from "react";

const BasicNode: FC<{
  node: NodeData;
  updateFocusedIndex: (index: number) => void;
  isFocused: boolean;
  index: number;
  addNode: (params: { node: NodeData; index: number }) => void;
  removeNodeByIndex: (index: number) => void;
  changeNodeValue: (params: { index: number; value: string }) => void;
}> = ({
  node,
  updateFocusedIndex,
  isFocused,
  addNode,
  index,
  removeNodeByIndex,
  changeNodeValue,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

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

      changeNodeValue({ index, value: textContent || "" });
    },
    [],
  );

  const handleClick = useCallback(() => {
    updateFocusedIndex(index);
  }, []);

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const target = event.target as HTMLDivElement;

      if (event.key === "Enter") {
        event.preventDefault();
        if (target.textContent?.[0] === "/") {
          return;
        }

        addNode({
          node: { type: node.type, value: "", id: nanoid() },
          index: index + 1,
        });

        updateFocusedIndex(index + 1);
      }

      if (event.key === "Backspace") {
        if (target.textContent?.length === 0) {
          event.preventDefault();
          removeNodeByIndex(index);
          updateFocusedIndex(index - 1);
        } else if (window?.getSelection()?.anchorOffset === 0) {
          event.preventDefault();
          removeNodeByIndex(index - 1);
          updateFocusedIndex(index - 1);
        }
      }
    },
    [],
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
