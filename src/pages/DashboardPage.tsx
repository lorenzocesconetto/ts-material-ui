import { Base } from "../layouts";
import { DetailToolbar } from "../components";
import { Typography } from "@mui/material";

const DashboardPage = () => {
  return (
    <Base title="Dashboard" toolbar={<DetailToolbar />}>
      <Typography>Dashboard content</Typography>
    </Base>
  );
};

export { DashboardPage };
