import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Icon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IPageRouteProps } from "../dataDefinitions";
import { useMatch, useResolvedPath } from "react-router-dom";

const ListItemLink = ({
  label,
  icon,
  to,
  onClick,
}: Omit<IPageRouteProps, "element"> & { onClick(): void }) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname });

  const handleClick = () => {
    navigate(to);
    onClick();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export { ListItemLink };
