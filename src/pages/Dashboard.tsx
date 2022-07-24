import { Base } from "../shared/layouts";
import { DetailToolbar } from "../shared/components";
import { Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Base title="Dashboard" toolbar={<DetailToolbar />}>
      <Typography>Dashboard content</Typography>
    </Base>
  );
};

export { Dashboard };
