import {eslintForConfigs} from "../helpers";
import yarapa from "../../src";

const eslint = eslintForConfigs(yarapa);

/**
 * Collect the rule identifiers reported for one inline source snippet.
 * @param source Source text to lint.
 * @param filePath Path the source is attributed to.
 * @returns Reported rule identifiers.
 */
export async function reportedRules(source: string, filePath: string): Promise<(null | string)[]> {
  const [result] = await eslint.lintText(source, {filePath});

  return result?.messages.map(message => message.ruleId) ?? [];
}
