import requireContext from "require-context.macro";
import { importAll } from "store/utils";

const moduleSelectors = importAll(requireContext("modules", true, /selectors.js$/), "selectors.js");
const selectors = importAll(requireContext("", false, /\w+$/), ".js");

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
	...moduleSelectors,
	...selectors
};
