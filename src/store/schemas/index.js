import requireContext from "require-context.macro";
import { importAll } from "store/utils";

const schemas = importAll(requireContext("../../modules", true, /\/schema.js$/), "schema.js");

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
	...schemas
};