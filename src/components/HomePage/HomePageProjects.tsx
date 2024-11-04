import { FC, useContext } from "react";
import { css } from "@emotion/react";
import {
  contentContainer,
  sectionDescription,
  sectionService,
  sectionTitle,
} from "@/styles/generalStyles";
import HomePageProjectsListItem from "./HomePageProjectsListItem";
import Link from "next/link";
import routeLinks from "@/routeLinks";
import { AppContext } from "@/context/AppContext";

import buttonStyles from "@/styles/buttonStyles";
import { projectInfos } from "@/value/projectsInfo";
const container = css`
  ${contentContainer}

  margin: auto;
  width: 100%;
`;
const contentWrapper = css`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2rem;
  padding: 5rem 0;

  @media screen and (max-width: 688px) {
    padding: 1rem 0;
  }
`;

const projectsContainer = css`
  border-radius: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
  margin-bottom: 3rem;
  width: 100%;
  padding: 3rem 0;

  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const HomePageProjects: FC = () => {
  const {
    state: {
      lang,
      darkmode,
      strings: { MyProjects: projectsStrings },
    },
  } = useContext(AppContext);

  return (
    <div css={container}>
      <div css={contentWrapper} data-aos="fade-up">
        <p css={sectionService({ darkmode })}>{projectsStrings.personalWork}</p>
        <h1 css={sectionTitle}>{projectsStrings.title}</h1>
        <p css={sectionDescription}>{projectsStrings.description}</p>

        <div css={projectsContainer}>
          {projectInfos.slice(0, 2).map((project) => (
            <HomePageProjectsListItem project={project} key={project.title} />
          ))}
        </div>

        <Link
          css={buttonStyles({ darkmode, size: "large" })}
          href={routeLinks.projects({ lang })}
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default HomePageProjects;
