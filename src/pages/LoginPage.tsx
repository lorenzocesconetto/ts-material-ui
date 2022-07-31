import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useRef, useState } from "react";
import { CustomTextField } from "../components";
import { useAuthContext } from "../providers";
import * as yup from "yup";

interface IFormData {
  email: string;
  password: string;
}

const FormValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const theme = useTheme();
  const { login } = useAuthContext();
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IFormData) => {
    let validatedData;
    try {
      validatedData = await FormValidationSchema.validate(data, {
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
      await login({
        email: validatedData.email,
        password: validatedData.password,
      });
    } catch (err) {
      alert((err as { message: string }).message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      height="100vh"
      width="100vw"
      bgcolor={theme.palette.background.default}
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ p: 5, width: "70%", maxWidth: theme.spacing(60) }}>
        <CardContent>
          <Box display="flex" gap={2} flexDirection="column">
            <Typography variant="h3" component="h1" align="center">
              Login
            </Typography>
            <Form ref={formRef} onSubmit={onSubmit}>
              <Box display="flex" gap={2} flexDirection="column">
                <CustomTextField
                  disabled={isLoading}
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                />
                <CustomTextField
                  disabled={isLoading}
                  fullWidth
                  name="password"
                  type="password"
                  label="Password"
                />
              </Box>
            </Form>
          </Box>
        </CardContent>
        <CardActions>
          <Box display="flex" width="100%" justifyContent="center">
            <Button
              disabled={isLoading}
              onClick={() => formRef.current?.submitForm()}
              variant="contained"
              endIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              Login
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export { LoginPage };
