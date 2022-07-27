import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ListToolbar } from "../../components";
import { useDebounce } from "../../hooks";
import { Base } from "../../layouts";
import { IPeopleList, PeopleService } from "../../services/api/people";

const PeopleListPage = () => {
  const [people, setPeople] = useState<IPeopleList[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const debounce = useDebounce();

  const searchText = useMemo(() => searchParams.get("q") || "", [searchParams]);

  useEffect(() => {
    debounce(async () => {
      try {
        const people = await PeopleService.getAll(1, searchText);
        setPeople(people.data);
      } catch (err) {
        alert((err as { message: string }).message);
      }
    });
  }, [searchText]);

  return (
    <Base
      title="People"
      toolbar={
        <ListToolbar
          searchText={searchText}
          onChangeSearchText={e =>
            setSearchParams({ q: e.target.value }, { replace: true })
          }
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

export { PeopleListPage };
