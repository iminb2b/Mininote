import { FC, useContext } from "react";
import Title from "./Title";
import useFocusedNodeIndex from "@/hooks/useFocusedNodeIndexProps";
import BasicNode from "../Node/BasicNode";
import Spacer from "./Spacer";
import { AppContext } from "@/context/AppContext";

const Page: FC = () => {
  const {
    state: {
      page: { nodes },
    },
  } = useContext(AppContext);

  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes: nodes,
  });

  return (
    <div>
      <Title />

      {nodes.map((node, index) => (
        <BasicNode
          key={node.id}
          node={node}
          isFocused={focusedNodeIndex === index}
          updateFocusedIndex={setFocusedNodeIndex}
          index={index}
        />
      ))}

      <Spacer showHint={!nodes.length} />
    </div>
  );
};

export default Page;
