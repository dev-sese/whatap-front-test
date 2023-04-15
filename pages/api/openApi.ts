import { OPEN_API, OPEN_API_HEADERS, OPEN_API_ROOT } from "@/common/const";
import {
  OPEN_API_EMPTY_STRING_KEYS,
  OPEN_API_JSON_KEYS,
  OPEN_API_KEYS,
  OPEN_API_RESULT,
} from "@/common/types";

const getPath = (
  url: string,
  param: { [key: string]: string | number } = {}
) => {
  let path = url;
  for (let key in param) {
    path = path.replace(new RegExp("\\{" + key + "\\}", "g"), param[key] + "");
  }

  return path;
};

const getOpenApi =
  (type: OPEN_API_KEYS) =>
  (
    key: OPEN_API_EMPTY_STRING_KEYS | OPEN_API_JSON_KEYS,
    param?: { [key: string]: string | number }
  ) =>
    new Promise<{ url: string; name: string }>((resolve, reject) => {
      if (key in OPEN_API[type]) {
        let nameObj: { [key: string]: string } = OPEN_API[type];
        return resolve({
          url: [OPEN_API_ROOT, type, key].filter((path) => !!path).join("/"),
          name: nameObj[key],
        });
      } else {
        reject("잘못된 API 정보");
      }
    }).then(({ url, name }: { url: string; name: string }) =>
      fetch(getPath(url, param), {
        headers: OPEN_API_HEADERS,
      })
        .then((response) => response.json())
        .then(
          (data): OPEN_API_RESULT => ({
            key,
            name,
            data,
          })
        )
    );

const meta = getOpenApi("json");
const spot = getOpenApi("");
const series = getOpenApi("json");

export default { meta, spot, series };
