import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ListToolbar } from "../../components";
import { useDebounce } from "../../hooks";
import { Base } from "../../layouts";
import { ICitiesList, CitiesService } from "../../services";
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

const CitiesListPage = () => {
  const [cities, setCities] = useState<ICitiesList[] | null>();
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
        const cities = await CitiesService.getAll(page, searchText);
        setCities(cities.data);
        setTotalCount(cities.totalCount);
      } catch (err) {
        setCities(null);
        setTotalCount(null);
      } finally {
        setIsLoading(false);
      }
    });
  }, [searchText, page]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you'd like to delete this record?")) return;
    try {
      await CitiesService.deleteById(id);
      setCities(cities?.filter(city => city.id !== id));
    } catch (err) {
      alert(err);
    }
  };

  const handleEdit = (id: number) => navigate(`/cities/${id}`);

  return (
    <Base
      title="Cities"
      toolbar={
        <ListToolbar
          onClickNew={() => navigate("/cities/new")}
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
              <TableCell width={100}>Actions</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ opacity: isLoading ? 0.3 : 1 }}>
            {cities === null || cities?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography align="center">
                    {cities === null
                      ? Environment.ERROR_RESPONSE
                      : Environment.EMPTY_RESPONSE}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              cities?.map(city => (
                <TableRow key={city.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(city.id)}
                      size="small"
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(city.id)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>{city.name}</TableCell>
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

export { CitiesListPage };
