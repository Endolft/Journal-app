import {
  ListItem,
  ListItemIcon,
  Grid,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ title = "", body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();
  const {active:noteActive}= useSelector(state => state.journal)

  const temporalImages=[];
  const idSelected= id ||""
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const selectNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls ,temporalImages}));
  };

  return (
    <ListItem disablePadding sx={{bgcolor:(idSelected === noteActive?.id)?  'primary.main':"" ,color:( idSelected=== noteActive?.id)?  'white':""}}>
      <ListItemButton onClick={selectNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
