import path from "node:path";

import {eslintForConfigs, packageRoot} from "../helpers";
import yarapa from "../../src";

export const eslint = eslintForConfigs(yarapa);
export const javascriptFixture = path.resolve(packageRoot, "fixtures/projects/untyped/index.js");
export const projectRoot = path.resolve(packageRoot, "fixtures/projects/typed");
