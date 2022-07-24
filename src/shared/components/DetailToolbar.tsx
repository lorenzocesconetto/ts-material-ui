import { Box, Button, Divider, Paper, useTheme } from "@mui/material";
import {
  Add as AddIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

const DetailToolbar = () => {
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      paddingX={1}
      paddingY={2}
      display="flex"
      gap={1}
      marginX={2}
      height={theme.spacing(5)}
      alignItems="center"
    >
      <Button disableElevation variant="contained" startIcon={<SaveIcon />}>
        Save
      </Button>
      <Button disableElevation variant="outlined" startIcon={<SaveIcon />}>
        Save and back
      </Button>
      <Button disableElevation variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button disableElevation variant="outlined" startIcon={<AddIcon />}>
        New
      </Button>
      <Box height="100%" display="flex" flex={1} justifyContent="end">
        <Divider orientation="vertical" />
      </Box>
      <Button disableElevation variant="outlined" startIcon={<ArrowBackIcon />}>
        Back
      </Button>
    </Box>
  );
};

export { DetailToolbar };
