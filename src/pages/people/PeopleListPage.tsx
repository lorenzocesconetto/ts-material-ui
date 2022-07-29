import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ListToolbar } from "../../components";
import { useDebounce } from "../../hooks";
import { Base } from "../../layouts";
import { IPeopleList, PeopleService } from "../../services/api/people";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
  TableFooter,
  LinearProgress,
  Pagination,
  IconButton,
  Icon,
} from "@mui/material";
import { Environment } from "../../environment";

const PeopleListPage = () => {
  const [people, setPeople] = useState<IPeopleList[] | null>();
  const [totalCount, setTotalCount] = useState<number | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const debounce = useDebounce();
  const navigate = useNavigate();

  const searchText = useMemo(() => searchParams.get("q") || "", [searchParams]);
  const page = useMemo(
    () => parseInt(searchParams.get("page") || "1"),
    [searchParams]
  );

  useEffect(() => {
    setIsLoading(true);
    debounce(async () => {
      try {
        const people = await PeopleService.getAll(page, searchText);
        setPeople(people.data);
        setTotalCount(people.totalCount);
      } catch (err) {
        setPeople(null);
        setTotalCount(null);
      } finally {
        setIsLoading(false);
      }
    });
  }, [searchText, page]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you'd like to delete this record?")) return;
    try {
      await PeopleService.deleteById(id);
      setPeople(people?.filter(person => person.id !== id));
    } catch (err) {
      alert(err);
    }
  };

  const handleEdit = (id: number) => navigate(`/people/${id}`);

  return (
    <Base
      title="People"
      toolbar={
        <ListToolbar
          onClickNew={() => navigate("/people/new")}
          searchText={searchText}
          onChangeSearchText={e =>
            setSearchParams({ q: e.target.value }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        sx={{ width: "auto" }}
        component={Paper}
        variant="outlined"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ opacity: isLoading ? 0.3 : 1 }}>
            {people === null || people?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography align="center">
                    {people === null
                      ? Environment.ERROR_RESPONSE
                      : Environment.EMPTY_RESPONSE}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              people?.map(person => (
                <TableRow key={person.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(person.id)}
                      size="small"
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(person.id)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.email}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}

            {!!totalCount && totalCount > Environment.ROW_LIMIT && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.ROW_LIMIT)}
                    onChange={(_, pageNumber) =>
                      setSearchParams(
                        {
                          q: searchText,
                          page: pageNumber.toString(),
                        },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </Base>
  );
};

export { PeopleListPage };
