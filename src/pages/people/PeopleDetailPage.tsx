import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DetailToolbar } from "../../components";
import { Base } from "../../layouts";

const PeopleDetailPage = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();
  const isEdit = id !== "new";

  return (
    <Base
      title="Person detail"
      toolbar={
        <DetailToolbar
          showButtonDelete={isEdit}
          showButtonNew={isEdit}
          onClickButtonSave={() => null}
          onClickButtonSaveAndBack={() => null}
          onClickButtonDelete={() => null}
          onClickButtonNew={() => navigate("/people/new")}
          onClickButtonBack={() => navigate("/people")}
        />
      }
    >
      <Typography>
        Detail for user: <b>{id}</b>
      </Typography>
    </Base>
  );
};

export { PeopleDetailPage };
