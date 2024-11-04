import { NodeData } from "@/types/nodeType";
import { FC, useCallback, useState } from "react";
import Title from "./Title";
import useFocusedNodeIndex from "@/hooks/useFocusedNodeIndexProps";
import BasicNode from "../Node/BasicNode";
import Spacer from "./Spacer";
import { nanoid } from "nanoid";

const Page: FC = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [title, setTitle] = useState("Default Title");
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes: nodes,
  });

  const addNode = useCallback(
    ({ node, index }: { node: NodeData; index: number }) => {
      const newNodes = [...nodes];

      newNodes.splice(index, 0, node);
      setNodes(newNodes);
    },
    [nodes],
  );

  const removeNodeByIndex = useCallback(
    (index: number) => {
      const newNodes = [...nodes];
      newNodes.splice(index, 1);
      setNodes(newNodes);
    },
    [nodes],
  );
  const changeNodeValue = useCallback(
    ({ index, value }: { index: number; value: string }) => {
      const newNodes = [...nodes];
      newNodes[index].value = value;
      setNodes(newNodes);
    },
    [nodes],
  );

  const handleSpacerClick = useCallback(() => {
    addNode({
      node: { type: "text", value: "", id: nanoid() },
      index: nodes.length,
    });
  }, [addNode, nodes.length]);

  return (
    <div>
      <Title addNode={addNode} title={title} changPageTitle={setTitle} />

      {nodes.map((node, index) => (
        <BasicNode
          key={node.id}
          node={node}
          isFocused={focusedNodeIndex === index}
          updateFocusedIndex={setFocusedNodeIndex}
          index={index}
          addNode={addNode}
          removeNodeByIndex={removeNodeByIndex}
          changeNodeValue={changeNodeValue}
        />
      ))}

      <Spacer showHint={!nodes.length} handleClick={handleSpacerClick} />
    </div>
  );
};

export default Page;
