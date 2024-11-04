import { css } from "@emotion/react";
import { FC } from "react";

type SpacerProps = {
  handleClick(): void;
  showHint: boolean;
};

const container = css``;

const Spacer: FC<SpacerProps> = ({ handleClick, showHint }) => {
  return (
    <div css={container} onClick={handleClick}>
      {showHint && "Click to create the first paragraph"}
    </div>
  );
};

export default Spacer;
