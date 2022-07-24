import { Box, Button, Paper, TextField, InputAdornment } from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";

const Toolbar = () => {
  return (
    <Box
      component={Paper}
      paddingX={1}
      paddingY={2}
      display="flex"
      gap={1}
      marginX={2}
    >
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search..."
        size="small"
      />
      <Box flex={1} display="flex" justifyContent="end">
        <Button disableElevation variant="contained" endIcon={<AddIcon />}>
          New
        </Button>
      </Box>
    </Box>
  );
};

export { Toolbar };
