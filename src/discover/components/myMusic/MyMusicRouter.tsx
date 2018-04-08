import * as React from "react";
import ArtistTracks from "../ArtistTracks";
import Performers, { default as MyPerformers } from "./MyPerformers";
import { Route, Switch } from "react-router";
import {
    ROUTE_PERFORMERS,
    ROUTE_COMPOSER,
    ROUTE_COMPOSERS,
    ROUTE_PLAYLIST,
    ROUTE_PLAYLISTS,
    ROUTE_TRACKS, ROUTE_SEARCH
} from "../../../util/constants";
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
import MyComposers from "./composers/MyComposers";
import Composer from "./composers/Composer";
import MyTracks from "./MyTracks.";
import MaxHeightContainer from "../../../widgets/MaxHeightContainer.";
import SearchByText from "../search/SearchByText";

interface IProps {
  appState?: AppState;
}
@inject("appState")
@observer
class MyMusicRouter extends React.Component<IProps, {}> {
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
      fontWeight: 900,
      background: "url(/src/img/street-old-music-wall-digital-manipulated-928931-wallhere.jpg) no-repeat",
      backgroundSize: "cover"
    };
    const liStyle: CSSProperties = {
      display: "inline"
    };
    return (
      <div style={style}>
        <MyTab />
        {/*
        <Route path={ROUTE_FAVORITES} component={MyPerformers} />
        <Route
          path={"/Me/Playlist/:playlistId/Tracks"}
          component={PlaylistTracks}
          exact
        />
        <Route path={ROUTE_PLAYLISTS} component={MyPlaylists} exact />
*/}
        <MaxHeightContainer style={{overflowY: "auto", overflowX: "hidden"}}>
          <Switch>
            <Route path={ROUTE_COMPOSERS} component={MyComposers} exact />
            <Route path={ROUTE_COMPOSER} component={Composer} exact />
            <Route path={ROUTE_PERFORMERS} component={MyPerformers} exact />
            <Route
              path={"/Me/Playlist/:playlistId/Tracks"}
              component={MyPlaylistTracks}
              exact
            />
            <Route
              path={ROUTE_PLAYLISTS}
              component={MyPlaylists}
              exact
            />
            <Route path={ROUTE_TRACKS} component={MyTracks} exact />
              <Route path={ROUTE_SEARCH} component={SearchByText} exact />
          </Switch>
        </MaxHeightContainer>
      </div>
    );
  }
}

export default MyMusicRouter;
