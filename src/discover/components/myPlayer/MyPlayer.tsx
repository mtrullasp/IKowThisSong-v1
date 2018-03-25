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
import {
  Link,
  Element as ScrollElement,
  Events as ScrollEvents,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import paleta from "../../../util/paleta";
declare let window: any;

interface IProps {
  waterMark: boolean;
  tipObject: string;
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
    const player = (
      <PlayerBar
        track={state.activeTrack}
        trackProgress={state.trackProgress}
        isPlaying={this.props.appState.playerIsPlaying}
      />
    );

    const items = this.props.appState.activeTracksList.map((track, index) => {
      return (
        <ListItem
          style={{
            fontFamily: FUNNY_FONT,
            fontSize: 30,
            color: "white",
            width: "100%"
          }}
          button
          component="div"
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
          <div style={{
            fontSize: 18,
            paddingRight: 40,
            marginLeft: 0,
            fontFamily: INFO_FONT,
            color: paleta.color800,
            fontWeight:
              index === this.props.appState.activeTrackIndex
                ? 900
                : 200
          }}>
            {track.title}
          </div>
          <div
            style={{
              position: "absolute",
              margin: 0,
              marginLeft: 10,
              right: 5,
              fontFamily: "Cousine",
              fontSize: 18,
              verticalAlign: "middle",
              color: SECONDARY_COLOR
            }}
          >
            {this.props.appState.secondsToTimeFormat(track.duration)}
          </div>
        </ListItem>
      );
    });

    const header = (
      <div style={{}}>
        <Row>
          <Col lg={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 10,
                width: "100%"
              }}
            >
              <Typography variant={"display2"}>
                {this.props.appState.activePlaylist.title}
              </Typography>
              <Typography variant={"subheading"}>
                {this.props.appState.activePlaylist.description}
              </Typography>
              <Typography variant={"subheading"} style={{fontSize: 14}}>
                {this.props.appState.activePlaylist.nb_tracks} tracks -{" "}
                {state.secondsToTimeFormat(state.activePlaylist.duration)} -{" "}
                {state.activePlaylist.fans} fans
              </Typography>
            </div>
          </Col>
          <Col lg={6}>
            <div style={{ alignSelf: "flex-end" }}>{player}</div>
          </Col>
        </Row>
        <Row>
          <Col
            lg={6}
            className={style({
              padding: 20
            })}
          >
            <Img
              src={
                this.props.appState.activeTrackCoverBig ||
                this.props.appState.activePlaylist.picture_big
              }
              width={"100%"}
            />
          </Col>
          <Col lg={6} className={style({padding: 20})}>
            <MaxHeightContainer delta={-70} style={{ overflowY: "auto" }}>
              {items}
            </MaxHeightContainer>
          </Col>
        </Row>
      </div>
    );

    return <div style={{ height: "100%" }}>{header}</div>;
  }
}

export default MyPlayer;
