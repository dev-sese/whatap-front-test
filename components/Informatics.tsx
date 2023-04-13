import { useEffect, useState } from "react";
import api, {
  OPEN_API_EMPTY_STRING_KEYS,
  OPEN_API_RESULT,
} from "@/pages/api/openApi";

interface InformaticsProps {
  spotKey: OPEN_API_EMPTY_STRING_KEYS;
}

const Informatics = ({ spotKey }: InformaticsProps) => {
  const [openApiData, setOpenApiData] = useState<OPEN_API_RESULT>();

  useEffect(() => {
    api.spot(spotKey).then((result) => setOpenApiData(result));
  }, []);

  return (
    <section>
      {typeof openApiData === "object" && (
        <div>
          <span>{openApiData.name}</span>
          <span>
            {typeof openApiData.data === "number" && openApiData.data}
          </span>
        </div>
      )}
    </section>
  );
};

export default Informatics;
