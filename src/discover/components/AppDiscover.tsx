///<reference path="../../../node_modules/@types/react-router/index.d.ts"/>
import * as React from "react";
import Performers, { default as MyPerformers } from "./myMusic/MyPerformers";
import { Grid, Row, Col } from "react-flexbox-grid";
import styled from "styled-components";
import { style } from "typestyle";
import { inject, observer } from "mobx-react";
import { AppState } from "../../stores/AppStore";
import { CSSProperties } from "react";
import { Route, withRouter } from "react-router";
import ArtistTracks from "./ArtistTracks";
import TextField from "material-ui/TextField";
import MyMusicRouter from "./myMusic/MyMusicRouter";
import {
  FUNNY_FONT,
  INFO_FONT,
  ROUTE_PERFORMERS,
  ROUTE_PLAYLIST,
  ROUTE_PLAYLISTS
} from "../../util/constants";
import PlaylistTracks from "./PlaylistTracks";
import MyPlaylists from "./myMusic/MyPlaylists";
import SwipeableViews from "react-swipeable-views";
import MyPlaylistTracks from "./MyPlaylistTracks";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    fontFamily: "Amatic SC",
    fontSize: 50,
    width: "100%"
  },
  menu: {
    width: 200
  }
};

//const HEADER_HEIGHT = 150;
interface IProps {
  appState?: AppState;
}
@inject("appState")
@observer
class AppDiscover extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
    props.appState.titolSeccio = "DISCOVER YOUR CLASSICAL MUSIC"
    //const {history} = props;
    //props.appState.go(ROUTE_INTERPRETERS);
  }

  static defaultProps = {};

  render() {
    console.log("render AppDiscover");
    const store = this.props.appState;
    const titleStyle: CSSProperties = {
      fontSize: 80,
      color: "#36454f",
      fontFamily: FUNNY_FONT,
      fontWeight: 900,
      bold: "900",
      textAlign: "center",
      marginLeft: 9,
      marginRight: 9
    };
    const overlayImageStyle: CSSProperties = {
      position: "relative",
      top: 0,
      left: 0
    };
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",

        }}
        className={style({
          margin: 0,
          padding: 0,
          overflowX: "hidden",
          overflowY: "auto"
        })}
      >
        <MyMusicRouter />
      </div>
    );
  }
}

export default withRouter(AppDiscover as any);
