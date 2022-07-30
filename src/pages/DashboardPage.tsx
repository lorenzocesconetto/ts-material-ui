import { Base } from "../layouts";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { ErrorOutline as ErrorIcon } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { CitiesService, PeopleService } from "../services";

const SIZING_PROPS = { xs: 12, sm: 10, md: 6, xl: 4 };

const DashboardPage = () => {
  const [totalPeople, setTotalPeople] = useState<number | null>();
  const [totalCities, setTotalCities] = useState<number | null>();

  const errorMessage = useMemo(
    () => (
      <Box display="flex" alignItems="center" gap={1}>
        <ErrorIcon />
        <Typography variant="caption">Unable to retrieve data</Typography>
      </Box>
    ),
    []
  );

  useEffect(() => {
    PeopleService.getAll()
      .then(response => setTotalPeople(response.totalCount))
      .catch(err => {
        console.error(err);
        setTotalPeople(null);
      });

    CitiesService.getAll()
      .then(response => setTotalCities(response.totalCount))
      .catch(err => {
        console.error(err);
        setTotalCities(null);
      });
  }, []);

  return (
    <Base title="Dashboard">
      <Grid container mt={4}>
        <Grid item container spacing={2} justifyContent="center">
          <Grid item {...SIZING_PROPS}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" align="center">
                  Total number of people
                </Typography>
                <Box p={3} display="flex" justifyContent="center">
                  {totalPeople === undefined ? (
                    <Typography variant="h1">
                      <CircularProgress />
                    </Typography>
                  ) : totalPeople === null ? (
                    errorMessage
                  ) : (
                    <Typography variant="h1" component="p" align="center">
                      {totalPeople}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item {...SIZING_PROPS}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" align="center">
                  Total number of cities
                </Typography>
                <Box p={3} display="flex" justifyContent="center">
                  {totalCities === undefined ? (
                    <Typography variant="h1">
                      <CircularProgress />
                    </Typography>
                  ) : totalCities === null ? (
                    errorMessage
                  ) : (
                    <Typography variant="h1" component="p" align="center">
                      {totalCities}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Base>
  );
};

export { DashboardPage };
