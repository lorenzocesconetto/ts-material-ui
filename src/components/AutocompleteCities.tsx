import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../hooks";
import { CitiesService } from "../services";

type TAutocompleteOption = {
  id: number;
  label: string;
};

interface IAutocompleteCitiesProps {
  isExternalLoading?: boolean;
}

const AutocompleteCities = ({
  isExternalLoading = false,
}: IAutocompleteCitiesProps) => {
  const { clearError, error, defaultValue, fieldName, registerField } =
    useField("cityId");
  const debounce = useDebounce(200);
  const [options, setOptions] = useState<TAutocompleteOption[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(
    defaultValue || null
  );

  // Register field within parent Form
  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  // Load Autocomplete options
  useEffect(() => {
    setIsLoading(true);
    debounce(async () => {
      try {
        const response = await CitiesService.getAll(1, searchText);
        const parsedData = response.data.map(city => ({
          id: city.id,
          label: city.name,
        }));
        setOptions(parsedData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    });
  }, [searchText]);

  const selectedOption: TAutocompleteOption | null = useMemo(() => {
    if (!selectedId) return null;
    return options.find(option => option.id === selectedId) || null;
  }, [selectedId, options]);

  return (
    <Autocomplete
      filterOptions={x => x}
      isOptionEqualToValue={(option, value) =>
        option.id === value.id && option.label === value.label
      }
      disablePortal
      options={options}
      loading={isLoading}
      disabled={isExternalLoading}
      value={selectedOption}
      onInputChange={(_, newSearchText) => setSearchText(newSearchText)}
      onChange={(_, newOption) => {
        setSelectedId(newOption ? newOption.id : null);
        clearError();
      }}
      renderInput={params => (
        <TextField
          {...params}
          helperText={error}
          error={!!error}
          label="City"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading || isExternalLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export { AutocompleteCities };
