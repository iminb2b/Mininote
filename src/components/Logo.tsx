import Link from "next/link";
import { FC, useContext } from "react";
import { css } from "@emotion/react";
import colors from "@/value/colors";
import routeLinks from "@/routeLinks";
import { AppContext } from "@/context/AppContext";
const logo = css`
  font-size: 2rem;
  font-weight: 700;
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.purple};
  }
`;

const Logo: FC = () => {
  const {
    state: { lang },
  } = useContext(AppContext);

  return (
    <Link href={routeLinks.homePage({ lang })} css={logo}>
      min.
    </Link>
  );
};

export default Logo;
