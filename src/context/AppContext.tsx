import { ReactNode, createContext, useReducer } from "react";
import stringsEn from "@/strings/stringsEn.json";
import { Strings } from "@/types/stringTypes";
import { NodeData, NodeType, Page } from "@/types/nodeType";
import { match } from "ts-pattern";
export type AppContextType = {
  strings: Strings;
  lang: "en" | "vi";
  darkmode: boolean;
  page: Page;
};

type AppAction =
  | {
      type: "enableDarkMode";
      payload: boolean;
    }
  | {
      type: "addNode";
      node: NodeData;
      index: number;
    }
  | {
      type: "removeNodeByIndex";
      nodeIndex: number;
    }
  | {
      type: "changeNodeType";
      nodeIndex: number;
      nodeType: NodeType;
    }
  | {
      type: "changeNodeValue";
      nodeIndex: number;
      value: string;
    }
  | {
      type: "setNodes";
      nodes: NodeData[];
    }
  | {
      type: "setTitle";
      title: string;
    };

interface AppState {
  darkmode: boolean;
  strings: Strings;
  lang: "en" | "vi";
  page: Page;
}
const appReducer = (state: AppState, action: AppAction) => {
  return match(action)
    .with({ type: "addNode" }, ({ index, node }) => {
      const newPageNodes = state.page.nodes.splice(index, 0, node);
      return {
        ...state,
        page: { ...state.page, nodes: newPageNodes },
      };
    })
    .with({ type: "changeNodeType" }, ({ nodeIndex, nodeType }) => {
      const newPageNodes = state.page.nodes.map((node, index) =>
        index === nodeIndex ? { ...node, type: nodeType, value: "" } : node,
      );

      return {
        ...state,
        page: {
          ...state.page,
          nodes: newPageNodes,
        },
      };
    })
    .with({ type: "changeNodeValue" }, ({ nodeIndex, value }) => {
      const newPageNodes = state.page.nodes.map((node, index) =>
        index === nodeIndex ? { ...node, value } : node,
      );

      return {
        ...state,
        page: {
          ...state.page,
          nodes: newPageNodes,
        },
      };
    })
    .with({ type: "enableDarkMode" }, ({ payload }) => {
      localStorage.setItem("darkmode", payload ? "true" : "false");
      return {
        ...state,
        darkmode: payload,
      };
    })
    .with({ type: "removeNodeByIndex" }, ({ nodeIndex }) => {
      const newPageNodes = state.page.nodes.filter(
        (node, index) => nodeIndex === index,
      );
      return {
        ...state,
        page: {
          ...state.page,
          node: newPageNodes,
        },
      };
    })
    .with({ type: "setNodes" }, ({ nodes }) => {
      return {
        ...state,
        page: {
          ...state.page,
          nodes,
        },
      };
    })
    .with({ type: "setTitle" }, ({ title }) => {
      return {
        ...state,
        page: { ...state.page, title },
      };
    })
    .exhaustive();
};

export const AppContext = createContext<{
  state: AppContextType;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: {
    strings: stringsEn,
    lang: "en",
    darkmode: false,
  },
  dispatch: () => null,
});

export const AppProvider: React.FC<{
  children: ReactNode;
  initialState: AppContextType;
}> = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
