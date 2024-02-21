import { FC, useContext } from "react";
import { css } from "@emotion/react";
import {
  boxWrapper,
  contentContainer,
  sectionDescription,
  sectionService,
  sectionTitle,
} from "@/styles/generalStyles";
import { AppContext } from "@/context/AppContext";
import colors from "@/value/colors";
import desktopIcon from "@/assets/images/desktopIcon.png";
import HomePageExperienceList from "./HomePageExperienceList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const container = css`
  ${contentContainer}

  margin: auto;
  width: 100%;
`;

const statementContainer = css`
  display: flex;
  padding: 3rem 5rem 0 3rem;

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;
const desktop = css`
  width: 100%;
  height: fit-content;
`;
const infoContainer = css`
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  line-height: 1.6;

  @media screen and (max-width: 960px) {
    padding: 2rem;
  }
`;

const icon = ({ darkmode }: { darkmode: boolean }) => css`
  color: ${darkmode ? colors.green : colors.purple};
  font-size: 1.25rem;
`;

const nameText = ({ darkmode }: { darkmode: boolean }) => css`
  font-size: clamp(1.5rem, 3vw, 3rem);
  color: ${darkmode ? colors.green : colors.purple};
`;

const downloadLink = ({ darkmode }: { darkmode: boolean }) => css`
  color: ${darkmode ? colors.green : colors.purple};
  align-items: center;
  display: flex;
`;

export type ExperienceInfo = {
  name: string;
  date: string;
  description?: string[];
  achievements?: string[];
  relevantCourse?: string[];
};

const HomePageAboutMe: FC = () => {
  const {
    state: { lang, darkmode },
  } = useContext(AppContext);

  const educationList: ExperienceInfo[] = [
    {
      name: "Computer Engineering Technology at Humber College Institute of Technology & Advanced Learning",
      date: "September 2018 - May 2021",
      relevantCourse: [
        "Data Structures and Algorithms, Web Development, Software Engineering",
      ],
      achievements: ["Dean's List"],
    },
    {
      name: "Planning And Development at National Economic University (Vietnam)",
      date: "September 2016 - December 2017",
    },
  ];

  const experienceList: ExperienceInfo[] = [
    {
      name: "Front-end Developer at Asl19",
      date: "2022 - now",
      description: [
        "Development web and mobile front-end application using Typescript and React.",
        "Collaborate with back-end developers and web designers to improve usability",
        "Code and deploy applications in a cross platform, cross browser environment; ensure applications are compatible with required operating system and browser versions.",
      ],
      achievements: [
        "Build a Google Web browser extension.",
        "Take part in more than 10 projects ",
        "Take part in develop and maintain shared packages that used through all company projects",
      ],
    },
    {
      name: "Front-end Developer Intern at LOOCREATIVE",
      date: "October 2021 - December 2021",
      description: [
        "Development web and mobile front-end application using HTML,CSS, JS and React.",
        "Translate UI/UX design wireframes into code",
        "Build performant, decoupled, testable, maintainable, and reuseable code.",
      ],
      achievements: ["Take part in more than 10 projects "],
    },
  ];

  return (
    <div css={container}>
      <div css={boxWrapper({ darkmode })} data-aos="fade-up">
        <p css={sectionService({ darkmode })}>PROFILE</p>
        <h1 css={sectionTitle}>About Me</h1>
        <p css={sectionDescription}>
          Using the right tools help web sites come together faster and easier.
        </p>

        <div css={statementContainer}>
          <img src={desktopIcon.src} css={desktop} />
          <div css={infoContainer}>
            <h2 css={nameText({ darkmode })}>Hi! I am Min.</h2>
            <p>
              I'm a Toronto-based designer who has a passion for UI/UX Design
              and Graphic Design. My mission is simple: to create designs that
              make people smile.
            </p>
            <p>
              With a background in both design and economics, I bring a unique
              perspective that combines analytical thinking and creativity to
              every project.
            </p>
            <a
              href={"/pdf/resume.pdf"}
              download="Nhung Nguyen - Front-end Developer Resume"
              target="_blank"
            >
              <div css={downloadLink({ darkmode })}>
                <FileDownloadIcon css={icon({ darkmode })} /> Download My Resume
              </div>
            </a>
          </div>
        </div>
        <HomePageExperienceList experience={educationList} title="Education" />
        <HomePageExperienceList
          experience={experienceList}
          title="Experience"
        />
      </div>
    </div>
  );
};

export default HomePageAboutMe;
