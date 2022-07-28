import { Typography } from "@mui/material";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ListToolbar } from "../../components";
import { Base } from "../../layouts";

const CitiesListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = useMemo(() => searchParams.get("q") || "", [searchParams]);

  // useEffect(() => {
  //   (async () => {})();
  // }, []);

  return (
    <Base
      title="Cities"
      toolbar={
        <ListToolbar
          searchText={searchText}
          onChangeSearchText={e =>
            setSearchParams({ q: e.target.value }, { replace: true })
          }
          onClickNew={() => null}
        />
      }
    >
      <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate hic
        deserunt, fuga provident esse nemo voluptatem natus. Laboriosam nisi
        doloremque illo atque ad quos reiciendis, distinctio rem quia deleniti
        cumque.
      </Typography>
    </Base>
  );
};

export { CitiesListPage };
