import React, { useContext } from "react";
import { ListItemText, ListItem, List, Paper, Typography, Snackbar, TextField, ListItemIcon } from "@material-ui/core";
import Blog from "./Blog";
import Albums from "./Albums";
import Context from "./Context";
import ProfilePic from "./ProfilePic";
import Bio from "./Bio";
import { LocationOn, Subject, Image, Extension } from "@material-ui/icons";
import FriendList from "./FriendList";
import Media from "./Media";
import { Redirect } from "react-router-dom";

const menuPoints = [
  { text: "Blog", icon: <Subject color="secondary" /> },
  { text: "Albums", icon: <Image color="secondary" /> },
  { text: "Media", icon: <Extension color="secondary" /> }
];

export default function Main() {
  const { tab, snackbar, dispatch, editMode, user, users, auth } = useContext(Context);

  console.log("Main is rendering");

  function renderFeed() {
    const isOwner = auth.id === user.id;
    switch (tab) {
      case 0:
        return <Blog isOwner={isOwner} />;
      case 1:
        return <Albums isOwner={isOwner} />;
      case 2:
        return <Media isOwner={isOwner} />;
      default:
        return new Error("Missing tab");
    }
  }

  const userFriends = user.friends.map(u => users[u]);

  return (
    <div className="grid">
      {!auth.id && <Redirect to="/login" />}
      <Paper className="grid-left">
        <ProfilePic editMode={editMode} pic={user.pic} />
        <List>
          <ListItem>
            {!editMode ? (
              <Typography variant="body1">{user.name}</Typography>
            ) : (
              <TextField
                name="name"
                onChange={e => dispatch({ type: "user", payload: { name: e.target.name, value: e.target.value } })}
                value={user.name}
              />
            )}
          </ListItem>
          <ListItem>
            <LocationOn style={{ marginRight: 5 }} />
            {!editMode ? (
              <Typography variant="caption" noWrap>
                {user.location}
              </Typography>
            ) : (
              <TextField
                name="location"
                onChange={e => dispatch({ type: "user", payload: { name: e.target.name, value: e.target.value } })}
                value={user.location}
              />
            )}
          </ListItem>
          <ListItem>
            <Bio bio={user.bio} editMode={editMode} dispatch={dispatch} />
          </ListItem>
          {menuPoints.map((point, i) => (
            <ListItem
              key={`menu_${i}`}
              button
              selected={tab === i}
              onClick={() => dispatch({ type: "setTab", payload: i })}
            >
              <ListItemIcon>{point.icon}</ListItemIcon>
              <ListItemText primary={point.text} />
            </ListItem>
          ))}
        </List>
      </Paper>
      {renderFeed()}
      <FriendList friends={userFriends} dispatch={dispatch} />
      {snackbar ? (
        <Snackbar
          message={<span>{snackbar.text}</span>}
          open={true}
          autoHideDuration={3000}
          onClose={() => console.log("closed") || dispatch({ type: "message", payload: null })}
        />
      ) : null}
    </div>
  );
}
