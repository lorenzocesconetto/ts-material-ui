import { Box, Button, Paper, TextField, InputAdornment } from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { Environment } from "../environment";
import React from "react";

interface IListToolbarProps {
  searchText: string;
  onChangeSearchText(e: React.ChangeEvent<HTMLInputElement>): void;
}
const ListToolbar = ({ searchText, onChangeSearchText }: IListToolbarProps) => {
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
        value={searchText}
        onChange={onChangeSearchText}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder={Environment.PLACEHOLDER_SEARCH}
        size="small"
      />
      <Box flex={1} display="flex" justifyContent="end">
        <Button disableElevation variant="contained" startIcon={<AddIcon />}>
          New
        </Button>
      </Box>
    </Box>
  );
};

export { ListToolbar };
