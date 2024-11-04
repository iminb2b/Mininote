import { AppContext } from "@/context/AppContext";
import { css } from "@emotion/react";
import { nanoid } from "nanoid";
import { FC, useCallback, useContext } from "react";

type SpacerProps = {
  showHint: boolean;
};

const container = css``;

const Spacer: FC<SpacerProps> = ({ showHint }) => {
  const {
    state: {
      page: { nodes },
    },
    dispatch,
  } = useContext(AppContext);

  const handleClick = useCallback(() => {
    dispatch({
      type: "addNode",
      node: { type: "text", value: "", id: nanoid() },
      index: nodes.length,
    });
  }, [dispatch, nodes.length]);

  return (
    <div css={container} onClick={handleClick}>
      {showHint && "Click to create the first paragraph"}
    </div>
  );
};

export default Spacer;
