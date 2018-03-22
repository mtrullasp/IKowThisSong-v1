import * as React from "react";
import ArtistTracks from "../ArtistTracks";
import Artists, {
  default as MyArtists
} from "./MyArtists";
import { Route, Switch } from "react-router";
import {ROUTE_ARTISTS, ROUTE_COMPOSER, ROUTE_COMPOSERS, ROUTE_PLAYLIST, ROUTE_PLAYLISTS} from "../../../util/constants";
import { CSSProperties } from "react";
import Tabs, { Tab } from "material-ui/Tabs";
import AppBar from "material-ui/AppBar";
import SwipeableViews from "react-swipeable-views";
import MyPlaylists from "./MyPlaylists";
import { AppState } from "../../../stores/AppStore";
import { inject, observer } from "mobx-react";
import Typography from "material-ui/Typography";
import { Link } from "react-router-dom";
import PlaylistTracks from "../PlaylistTracks";
import MyTab from "../../../widgets/MyTab";
import MyPlaylistTracks from "../MyPlaylistTracks";
import ClientArea from "../ClientArea.";
import MyComposers from "./MyComposers";
import Composer from "./Composer";

interface IProps {
  appState?: AppState;
}
@inject("appState")
@observer
class MyMusic extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {};

  render() {
    const style: CSSProperties = {
      width: "100%",
      fontFamily: "Amatic SC",
      bold: "700",
      fontSize: 40,
      fontWeight: 900
    };
    const liStyle: CSSProperties = {
      display: "inline"
    };
    return (
      <div style={style}>
        <MyTab />
{/*
        <Route path={ROUTE_FAVORITES} component={MyArtists} />
        <Route
          path={"/Me/Playlist/:playlistId/Tracks"}
          component={PlaylistTracks}
          exact
        />
        <Route path={ROUTE_PLAYLISTS} component={MyPlaylists} exact />
*/}
        <Route path={ROUTE_COMPOSERS} component={MyComposers} exact />
        <Route path={ROUTE_COMPOSER} component={Composer} />
        <Route path={ROUTE_ARTISTS} component={MyArtists} exact />
        <Route
          path={"/Me/Playlist/:playlistId/Tracks"}
          component={MyPlaylistTracks}
          exact
        />
        <Route path={ROUTE_PLAYLISTS} component={MyPlaylists} exact />
        <Route
          path={ROUTE_PLAYLIST}
          component={MyPlaylistTracks}
          exact
        />
      </div>
    );
  }
}

export default MyMusic;
