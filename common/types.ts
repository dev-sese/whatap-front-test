import { OPEN_API } from "@/common/const";

export type OPEN_API_KEYS = keyof typeof OPEN_API;
export type OPEN_API_EMPTY_STRING_KEYS = keyof typeof OPEN_API[""];
export type OPEN_API_JSON_KEYS = keyof typeof OPEN_API["json"];

export type OPEN_API_RESULT = {
  key: string;
  name: string;
  data: any;
};

export interface WidgectPropsType {
  setApiQueue: React.Dispatch<
    React.SetStateAction<
      {
        type: string;
        key: OPEN_API_EMPTY_STRING_KEYS | OPEN_API_JSON_KEYS;
        widget: string;
        etime?: number;
        stime?: number;
        time: string;
      }[]
    >
  >;
  data: any;
  pause: boolean;
}
