import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";
import { Row, Col } from "react-flexbox-grid";
import Button from "material-ui/Button";
import { inject, observer } from "mobx-react";
import { AppState } from "../../../stores/AppStore";
import List, { ListItem, ListItemText } from "material-ui/List";
import {
  FUNNY_FONT,
  INFO_FONT,
  SECONDARY_COLOR,
  SELECTED_COLOR
} from "../../../util/constants";
import Typography from "material-ui/Typography";
import { style } from "typestyle";
import { CSSProperties } from "react";
import { AutoSizer } from "react-virtualized";
//import from "react-cl-audio-player";
import ReactPlayer from "react-player";
import InlineTrackPlayer from "../../../widgets/InlineTrackPlayer.";
import PlayerBar from "../../../widgets/PlayerBar";
import MaxHeightContainer from "../../../widgets/MaxHeightContainer.";
import Img from "../../../widgets/Img.";
declare let window: any;

interface IProps {
  waterMark: boolean;
  appState?: AppState;
}
@inject("appState")
@observer
class MyPlayer extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {};

  componentDidMount(): void {
    this.setupUl();
  }

  componentDidUpdat(): void {
    this.setupUl();
  }

  private setupUl() {
    $(ReactDOM.findDOMNode(this))
      .find("ul")
      .css("height", "100%")
      .css("overflowY", "auto");
  }

  render() {
    const state = this.props.appState;
    if (!state.activePlaylist) {
      return null;
    }
    const footer = (
      <PlayerBar
        track={state.activeTrack}
        trackProgress={state.trackProgress}
      />
    );
    const header = (
      <div style={{}}>
        <Row>
          <Col lg={2}>
            <Img src={this.props.appState.activePlaylist.picture_medium} />
          </Col>
          <Col lg={8}>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 20, width: "100%" }}>
              <Typography variant={"display3"}>
                {this.props.appState.activePlaylist.title}
              </Typography>
              <Typography variant={"subheading"}>
                {this.props.appState.activePlaylist.description}
              </Typography>
              <Typography variant={"subheading"}>
                {this.props.appState.activePlaylist.nb_tracks} tracks -{" "}
                {state.secondsToTimeFormat(state.activePlaylist.duration)} -{" "}
                {state.activePlaylist.fans} fans
              </Typography>
            </div>
            <div style={{alignSelf: "flex-end"}}>
            {footer}
            </div>
          </Col>
          <Col lg={2}>
            <Img src={this.props.appState.activeTrackCover} />
          </Col>
        </Row>
      </div>
    );
    const items = this.props.appState.activeTracksList.map((track, index) => {
      const listItem = (
        <ListItem
          style={{
            background:
              index === this.props.appState.activeTrackIndex
                ? SELECTED_COLOR
                : "transparent",
            fontFamily: FUNNY_FONT,
            fontSize: 40,
            color: "white"
          }}
          button
          component="a"
          onClick={() => {
            if (
              state.playerIsPlaying &&
              this.props.appState.activeTrackIndex === index
            ) {
              this.props.appState.activeTrackIndex = -1;
              state.playerPause();
            } else {
              this.props.appState.activeTrackIndex = index;
              debugger;
              state.playerPlayPlaylist(
                this.props.appState.activePlayListId,
                true,
                index
              );
            }
          }}
        >
          <ListItemText
            key={index}
            primary={track.album.title}
            secondary={track.title}
          />
          <div
            style={{
              position: "absolute",
              right: 30,
              fontFamily: INFO_FONT,
              fontSize: 22,
              verticalAlign: "middle",
              color: SECONDARY_COLOR
            }}
          >
            {this.props.appState.secondsToTimeFormat(track.duration)}
          </div>
        </ListItem>
      );
      return listItem;
    });

    const body = (
      <MaxHeightContainer delta={-100} style={{ overflowY: "auto" }}>
        {items}
      </MaxHeightContainer>
    );
    return (
      <div style={{ height: "100%" }}>
        {header}
        {body}
      </div>
    );
  }
  /*
  render() {
    //const DZ = window.DZ;
    const state = this.props.appState;
    debugger;
    if (!this.props.appState.activePlaylist) {
      return null;
    }
    const items = this.props.appState.activeTracksList.map((track, index) => {
      const listItem = (
        <ListItem
          style={{
            background:
              index === this.props.appState.activeTrackIndex
                ? SELECTED_COLOR
                : "transparent",
            fontFamily: FUNNY_FONT,
            fontSize: 40,
            color: "white"
          }}
          button
          component="a"
          href="#simple-list"
          onClick={() => {
            if (
              state.playerIsPlaying &&
              this.props.appState.activeTrackIndex === index
            ) {
              this.props.appState.activeTrackIndex = -1;
              state.playerPause();
            } else {
              this.props.appState.activeTrackIndex = index;
              debugger;
              state.playerPlayPlaylist(
                this.props.appState.activePlayListId,
                true,
                index
              );
            }
            /!*
            DZ.player.pause();
            DZ.player.seek(index);
            DZ.player.play();
*!/
          }}
        >
          <ListItemText
            key={index}
            primary={track.album.title}
            secondary={track.title}
          />
          <div
            style={{
              position: "absolute",
              right: 30,
              fontFamily: INFO_FONT,
              fontSize: 22,
              verticalAlign: "middle",
              color: SECONDARY_COLOR
            }}
          >
            {this.props.appState.secondsToTimeFormat(track.duration)}
          </div>
          {/!*<ReactPlayer style={{width: "100%", height: 50}} />*!/}
        </ListItem>
      );
      if (index === this.props.appState.activeTrackIndex) {
        return <InlineTrackPlayer track={track}>{listItem}</InlineTrackPlayer>;
      } else {
        return listItem;
      }
    });
    debugger;
    /!*
    const backGroundStyle: CSSProperties = this.props.waterMark
      ? {
          backgroundImage:
            "url(" + this.props.appState.activePlaylist.picture_big + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          filter: "alpha(opacity=10)"
        }
      : {};
*!/
    const TOP = 100;
    const LEFT = 560;
    const backgroundImage = this.props.waterMark ? (
      <img
        src={this.props.appState.activePlaylist.picture_big}
        style={{
          width: "100%",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0.1,
          top: 0,
          right: 0,
          left: 0
        }}
      />
    ) : null;
    return (
      <AutoSizer>
        {({ width, height }) => (
          <div
            style={{
              width: width,
              height: height
            }}
          >
            <List>{items}</List>
            {backgroundImage}
          </div>
        )}
      </AutoSizer>
    );
  }
*/
}

export default MyPlayer;
