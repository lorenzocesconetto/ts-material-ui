import { Box, Button, Paper, TextField, InputAdornment } from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { Environment } from "../environment";
import React from "react";

interface IListToolbarProps {
  searchText: string;
  onChangeSearchText(e: React.ChangeEvent<HTMLInputElement>): void;
  onClickNew(): void;
}
const ListToolbar = ({
  searchText,
  onChangeSearchText,
  onClickNew,
}: IListToolbarProps) => {
  return (
    <Box display="flex" gap={1}>
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
        <Button
          onClick={onClickNew}
          disableElevation
          variant="contained"
          startIcon={<AddIcon />}
        >
          New
        </Button>
      </Box>
    </Box>
  );
};

export { ListToolbar };
