import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AutocompleteCities,
  CustomTextField,
  DetailToolbar,
} from "../../components";
import { Base } from "../../layouts";
import { PeopleService } from "../../services";
import { Form } from "@unform/web";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useForm } from "../../hooks";
import * as yup from "yup";

const SIZING_PROPS = { xs: 12, md: 6, xl: 4 };

interface IFormData {
  name: string;
  cityId: number;
  email: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().min(3).required(),
  cityId: yup
    .number()
    .typeError("Pick one of the available options")
    .integer()
    .positive()
    .required(),
  email: yup.string().email().required(),
});

const PeopleDetailPage = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();
  const isEdit = id !== "new";
  const [title, setTitle] = useState(isEdit ? "" : "New person");
  const [isLoading, setIsLoading] = useState(false);
  const { formRef, save, saveAndBack, getIsSaveAndBack } = useForm();

  useEffect(() => {
    (async () => {
      if (!isEdit) {
        formRef.current?.setData({ name: "", cityId: null, email: "" }); // Needed so components are set as controlled from the beginning
        setTitle("New person"); // Needed for when switching from editing into new
      } else {
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

  const saveHandle = async (data: IFormData): Promise<void> => {
    let validatedData;
    try {
      validatedData = await formValidationSchema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const validationErrors: Record<string, string> = {};

      (err as yup.ValidationError).inner.forEach(item => {
        if (!item.path) return;
        validationErrors[item.path] = item.message;
      });

      formRef.current?.setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (isEdit) {
        response = await PeopleService.updateById(parseInt(id), validatedData);
      } else {
        response = await PeopleService.create(validatedData);
      }

      if (getIsSaveAndBack()) {
        navigate("/people");
      } else if (!isEdit) {
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
          onClickButtonSave={save}
          onClickButtonSaveAndBack={saveAndBack}
          onClickButtonDelete={() => handleDelete(parseInt(id))}
          onClickButtonNew={() => navigate("/people/new")}
          onClickButtonBack={() => navigate("/people")}
          isLoadingButtonNew={isLoading}
          isLoadingButtonDelete={isLoading}
          isLoadingButtonSave={isLoading}
          isLoadingButtonSaveAndBack={isLoading}
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
              <Grid item {...SIZING_PROPS}>
                <CustomTextField
                  fullWidth
                  name="name"
                  size="medium"
                  label="Name"
                  disabled={isLoading}
                  sx={{ opacity: isLoading ? 0.3 : 1 }}
                  onChange={e => isEdit && setTitle(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item>
              <Grid item {...SIZING_PROPS}>
                <CustomTextField
                  fullWidth
                  name="email"
                  size="medium"
                  label="Email"
                  disabled={isLoading}
                  sx={{ opacity: isLoading ? 0.3 : 1 }}
                />
              </Grid>
            </Grid>

            <Grid container item>
              <Grid item {...SIZING_PROPS}>
                <AutocompleteCities isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Base>
  );
};

export { PeopleDetailPage };
