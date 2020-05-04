import React, { useContext } from "react";
import "./CoverPicture.css";

import Context from "./Context";
import { Button, Fab, Avatar } from "@material-ui/core";
import { Edit, Save, Movie, Games, School, Book } from "@material-ui/icons";
import { useSpring, animated, useTransition } from "react-spring";

import { withRouter } from "react-router-dom";

import img1 from "../assets/1_.jpeg";
import img2 from "../assets/2_.jpeg";
import img3 from "../assets/3_.jpeg";
function getUrl(tab_) {
  switch (tab_) {
    case 0:
      return img1;
    case 1:
      return img2;
    case 2:
      return img3;
    default:
      return new Error("Wrong image");
  }
}

function CoverPicture({ location }) {
  const { tab, editMode, dispatch, auth, user } = useContext(Context);

  function handleCancel() {
    dispatch({ type: "editmode", payload: !editMode });
    dispatch({ type: "reset" });
  }

  const url = getUrl(tab);

  const animateFab = useSpring({
    transform: tab === 0 ? "scale(1)" : "scale(0.5)",
    opacity: tab === 0 && auth.id === user.id ? 1 : 0
  });

  const cancelBtn = useSpring({
    transform: editMode ? "translate3d(0,0px,0)" : "translate3d(0,40px,0)",
    opacity: editMode ? 1 : 0
  });

  const transition = useTransition(editMode, null, {
    from: {
      opacity: 0,
      transform: "rotate(360deg)"
    },
    enter: {
      opacity: 1,
      transform: "rotate(0deg)"
    },
    leave: {
      opacity: 0,
      transform: "rotate(0deg)",
      position: "absolute"
    }
  });

  const tab2animation = useSpring({
    opacity: tab === 2 ? 1 : 0,
    transform: tab === 2 ? `translate3d(130px,0px,0)` : `translate3d(0px,0,0)`
  });

  return (
    <div className="CoverPicture">
      <div className="img" style={{ backgroundImage: `url(${url})` }} />
      {location.pathname === "/" && (
        <div className="edit">
          <div className="edit-center">
            <animated.div className="fab-div" style={animateFab}>
              <Fab
                className="icon"
                color="secondary"
                onClick={() => dispatch({ type: "editmode", payload: !editMode })}
              >
                {transition.map(({ item, _, props }) =>
                  item ? (
                    <animated.div style={props}>
                      <Save />
                    </animated.div>
                  ) : (
                    <animated.div style={props}>
                      <Edit />
                    </animated.div>
                  )
                )}
              </Fab>
              <animated.div style={cancelBtn}>
                <Button variant="contained" color="default" onClick={handleCancel}>
                  Cancel
                </Button>
              </animated.div>
            </animated.div>
            <animated.div className="Tab2-top-div" style={tab2animation}>
              <Avatar>
                <Movie color="secondary" />
              </Avatar>
              <Avatar>
                <Games color="secondary" />
              </Avatar>
              <Avatar>
                <School color="secondary" />
              </Avatar>
              <Avatar>
                <Book color="secondary" />
              </Avatar>
            </animated.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(CoverPicture);
