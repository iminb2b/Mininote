export type SharedStrings = {
  button: {
    viewProjects: string;
  };
};

export type Strings = {
  $schema: string;

  /**
   * Shared (reused in several components)
   */
  shared: SharedStrings;

  // Header: {
  //   navLinks: {
  //     about: string;
  //     work: string;
  //     contact: string;
  //   };
  // };

  HomePage: {
    Hero: {
      title2: string;
      title1: string;
      description: string;
    };
  };

  // MyService: {
  //   title: string;
  //   performanceOptimization: string;
  //   accessibility: string;
  //   frontendBackend: string;
  // };

  // MySkills: {
  //   title: string;
  //   description: string;
  // };

  MyProjects: {
    title: string;
    description: string;
    personalWork: string;
  };

  ContactPage: {
    title: string;
    description: string;
    followOnSocialMedia: string;
  };
};

// Via https://stackoverflow.com/a/47058976/7949868

type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string;

type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

export type StringKey = Join<PathsToStringProps<Strings>, ".">;
