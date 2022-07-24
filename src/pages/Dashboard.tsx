import { Base } from "../shared/layouts";
import { DetailToolbar } from "../shared/components";

const Dashboard = () => {
  return (
    <Base title="Dashboard" toolbar={<DetailToolbar />}>
      Test
    </Base>
  );
};

export { Dashboard };
