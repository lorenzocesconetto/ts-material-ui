import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomTextField, DetailToolbar } from "../../components";
import { Base } from "../../layouts";
import { PeopleService } from "../../services/api/people";
import { Form } from "@unform/web";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";

interface IFormData {
  name: string;
  cityId: number;
  email: string;
}

const PeopleDetailPage = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();
  const isEdit = id !== "new";
  const [title, setTitle] = useState(isEdit ? "" : "New person");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    (async () => {
      if (isEdit) {
        setIsLoading(true);
        try {
          const data = await PeopleService.getById(parseInt(id));
          setTitle(data.name);
          formRef.current?.setData(data);
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

  const saveHandle = async (data: IFormData) => {
    setIsLoading(true);
    try {
      let response;
      if (isEdit) {
        response = await PeopleService.updateById(parseInt(id), data);
      } else {
        response = await PeopleService.create(data);
        navigate(`/people/${response.id}`);
      }
    } catch (err) {
      alert((err as { message: string }).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Base
      title={title}
      toolbar={
        <DetailToolbar
          showButtonDelete={isEdit}
          showButtonNew={isEdit}
          onClickButtonSave={() => formRef.current?.submitForm()}
          onClickButtonSaveAndBack={() => formRef.current?.submitForm()}
          onClickButtonDelete={() => handleDelete(parseInt(id))}
          onClickButtonNew={() => navigate("/people/new")}
          onClickButtonBack={() => navigate("/people")}
        />
      }
    >
      <Box mt={1} component={Paper} variant="outlined">
        <Form ref={formRef} onSubmit={saveHandle}>
          <Grid container direction="column" p={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">General</Typography>
            </Grid>

            <Grid container item>
              <Grid item xs={12} md={6} xl={4}>
                <CustomTextField
                  fullWidth
                  name="name"
                  size="small"
                  label="Name"
                  disabled={isLoading}
                  sx={{ opacity: isLoading ? 0.3 : 1 }}
                  onChange={e => setTitle(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item>
              <Grid item xs={12} md={6} xl={4}>
                <CustomTextField
                  fullWidth
                  name="email"
                  size="small"
                  label="Email"
                  disabled={isLoading}
                  sx={{ opacity: isLoading ? 0.3 : 1 }}
                />
              </Grid>
            </Grid>

            <Grid container item>
              <Grid item xs={12} md={6} xl={4}>
                <CustomTextField
                  fullWidth
                  name="cityId"
                  size="small"
                  label="City"
                  disabled={isLoading}
                  sx={{ opacity: isLoading ? 0.3 : 1 }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Base>
  );
};

export { PeopleDetailPage };
