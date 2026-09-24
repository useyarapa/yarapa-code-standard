import {NODE_MAIN_FILES, NODE_RESOLUTION_EXTENSIONS} from "../constants";

export const NODE_SETTINGS: Record<string, unknown> = {
  node: {
    resolverConfig: {
      mainFiles: NODE_MAIN_FILES,
    },
    tryExtensions: NODE_RESOLUTION_EXTENSIONS,
  },
};
