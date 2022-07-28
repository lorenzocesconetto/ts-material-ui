import { LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailToolbar } from "../../components";
import { Base } from "../../layouts";
import { PeopleService } from "../../services/api/people";

const PeopleDetailPage = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();
  const isEdit = id !== "new";
  const [title, setTile] = useState(isEdit ? "" : "New person");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isEdit) {
        setIsLoading(true);
        try {
          const data = await PeopleService.getById(parseInt(id));
          setTile(data.name);
        } catch (err) {
          console.error(err);
          alert((err as { message: string }).message);
          navigate("/people");
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [id]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you'd like to delete this record?")) return;
    try {
      await PeopleService.deleteById(id);
      alert("Successfully deleted");
      navigate("/people");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Base
      title={title}
      toolbar={
        <DetailToolbar
          showButtonDelete={isEdit}
          showButtonNew={isEdit}
          onClickButtonSave={() => null}
          onClickButtonSaveAndBack={() => null}
          onClickButtonDelete={() => handleDelete(parseInt(id))}
          onClickButtonNew={() => navigate("/people/new")}
          onClickButtonBack={() => navigate("/people")}
        />
      }
    >
      <Typography>
        Detail for user: <b>{id}</b>
      </Typography>
      {isLoading && <LinearProgress />}
    </Base>
  );
};

export { PeopleDetailPage };
