import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

interface ICustomTextFieldProps {
  name: string;
}
const CustomTextField = ({
  name,
  ...props
}: TextFieldProps & ICustomTextFieldProps) => {
  const { clearError, defaultValue, error, fieldName, registerField } =
    useField(name);
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [fieldName, registerField, value]);

  return (
    <TextField
      {...props}
      value={value}
      onChange={e => {
        setValue(e.target.value);
        props.onChange?.(e);
      }}
      helperText={error}
      error={!!error}
      onKeyDown={e => {
        error && clearError();
        props.onKeyDown?.(e);
      }}
    />
  );
};

export { CustomTextField };
