import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";
import Button from "material-ui/Button";
import { inject, observer } from "mobx-react";
import { AppState } from "../../../stores/AppStore";
import List, { ListItem, ListItemText } from "material-ui/List";
import { FUNNY_FONT, SELECTED_COLOR } from "../../../util/constants";
import Typography from "material-ui/Typography";
import { style } from "typestyle";
import { CSSProperties } from "react";
import { AutoSizer } from "react-virtualized";
//import from "react-cl-audio-player";
import ReactPlayer from "react-player";
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
    debugger ;$(ReactDOM.findDOMNode(this))
      .find("ul")
      .css("height", "100%")
      .css("overflowY", "auto");
  }

  render() {
    //const DZ = window.DZ;
    const state = this.props.appState;
    const items = this.props.appState.activeTracksList.map((track, index) => {
      return (
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
            debugger;
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
            /*
            DZ.player.pause();
            DZ.player.seek(index);
            DZ.player.play();
*/
          }}
        >
          <ListItemText
            key={index}
            primary={track.album.title}
            secondary={track.title}
          />
          {/*<ReactPlayer style={{width: "100%", height: 50}} />*/}
        </ListItem>
      );
    });
    debugger;
    /*
    const backGroundStyle: CSSProperties = this.props.waterMark
      ? {
          backgroundImage:
            "url(" + this.props.appState.activePlaylist.picture_big + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          filter: "alpha(opacity=10)"
        }
      : {};
*/
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
}

export default MyPlayer;
