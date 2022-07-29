import {
  Box,
  Button,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
  Theme,
  Tooltip,
} from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import {
  Add as AddIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

interface IDetailToolbarProps {
  showButtonSave?: boolean;
  showButtonSaveAndBack?: boolean;
  showButtonDelete?: boolean;
  showButtonNew?: boolean;
  showButtonBack?: boolean;

  onClickButtonSave?(): void;
  onClickButtonSaveAndBack?(): void;
  onClickButtonDelete?(): void;
  onClickButtonNew?(): void;
  onClickButtonBack?(): void;

  isLoadingButtonSave?: boolean;
  isLoadingButtonSaveAndBack?: boolean;
  isLoadingButtonDelete?: boolean;
  isLoadingButtonNew?: boolean;
  isLoadingButtonBack?: boolean;
}

const CustomButton = ({
  text,
  startIcon,
  ...props
}: ButtonProps & { text: string }) => {
  const isScreenXs = useMediaQuery((theme: Theme) =>
    theme.breakpoints.only("xs")
  );

  const button = (
    <Button
      disableElevation
      variant="outlined"
      startIcon={isScreenXs ? null : startIcon}
      {...props}
    >
      {isScreenXs && startIcon}
      <Typography
        variant="button"
        noWrap
        color={
          props.variant && props.variant !== "outlined" ? undefined : "primary"
        }
      >
        {!isScreenXs && text}
      </Typography>
    </Button>
  );

  return isScreenXs ? <Tooltip title={text}>{button}</Tooltip> : button;
};

const DetailToolbar = ({
  showButtonSave = true,
  showButtonSaveAndBack = true,
  showButtonDelete = true,
  showButtonNew = true,
  showButtonBack = true,

  onClickButtonSave,
  onClickButtonSaveAndBack,
  onClickButtonDelete,
  onClickButtonNew,
  onClickButtonBack,

  isLoadingButtonSave = false,
  isLoadingButtonSaveAndBack = false,
  isLoadingButtonDelete = false,
  isLoadingButtonNew = false,
  isLoadingButtonBack = false,
}: IDetailToolbarProps) => {
  const theme = useTheme();
  const isScreenMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const buttonSave = (
    <CustomButton
      text="Save"
      variant="contained"
      onClick={onClickButtonSave}
      startIcon={<SaveIcon />}
    />
  );

  const buttonSaveAndBack = (
    <CustomButton
      text="Save and back"
      onClick={onClickButtonSaveAndBack}
      startIcon={<SaveIcon />}
    />
  );

  const buttonDelete = (
    <CustomButton
      text="Delete"
      onClick={onClickButtonDelete}
      startIcon={<DeleteIcon />}
    />
  );

  const buttonNew = (
    <CustomButton
      text="New"
      onClick={onClickButtonNew}
      startIcon={<AddIcon />}
    />
  );

  const buttonBack = (
    <CustomButton
      text="Back"
      onClick={onClickButtonBack}
      startIcon={<ArrowBackIcon />}
    />
  );

  return (
    <Box display="flex" gap={1} alignItems="center" height="100%">
      {showButtonSave &&
        (isLoadingButtonSave ? (
          <Typography variant="h3">
            <Skeleton>{buttonSave}</Skeleton>
          </Typography>
        ) : (
          buttonSave
        ))}

      {showButtonSaveAndBack &&
        !isScreenMdDown &&
        (isLoadingButtonSaveAndBack ? (
          <Typography variant="h3">
            <Skeleton>{buttonSaveAndBack}</Skeleton>
          </Typography>
        ) : (
          buttonSaveAndBack
        ))}

      {showButtonDelete &&
        (isLoadingButtonDelete ? (
          <Typography variant="h3">
            <Skeleton>{buttonDelete}</Skeleton>
          </Typography>
        ) : (
          buttonDelete
        ))}

      {showButtonNew &&
        !isScreenMdDown &&
        (isLoadingButtonNew ? (
          <Typography variant="h3">
            <Skeleton>{buttonNew}</Skeleton>
          </Typography>
        ) : (
          buttonNew
        ))}

      <Box height="100%" display="flex" flex={1} justifyContent="end">
        {showButtonBack && <Divider orientation="vertical" />}
      </Box>

      {showButtonBack &&
        (isLoadingButtonBack ? (
          <Typography variant="h3">
            <Skeleton>{buttonBack}</Skeleton>
          </Typography>
        ) : (
          buttonBack
        ))}
    </Box>
  );
};

export { DetailToolbar };
