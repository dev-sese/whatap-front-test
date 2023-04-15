import { OPEN_API } from "./const";

export type OPEN_API_KEYS = keyof typeof OPEN_API;
export type OPEN_API_EMPTY_STRING_KEYS = keyof typeof OPEN_API[""];
export type OPEN_API_JSON_KEYS = keyof typeof OPEN_API["json"];

export type OPEN_API_RESULT = {
  key: string;
  name: string;
  data: number | object;
};
