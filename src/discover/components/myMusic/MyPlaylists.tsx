import * as React from "react";
import { inject, observer } from "mobx-react";
import { AppState } from "../../../stores/AppStore";
//import GridList, { GridListTile,  GridListTileBar } from 'material-ui/GridList';
import Subheader from "material-ui/List/ListSubheader";
import IconButton from "material-ui/IconButton";
import InfoIcon from "material-ui-icons/Info";
import withStyles, { ClassNameMap } from "material-ui/styles/withStyles";
import { Grid, Row, Col } from "react-flexbox-grid";
//import GridListTile, {default as GridListTileBar} from "material-ui";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import Paper from "material-ui/Paper";
import { style } from "typestyle";
import { EventHandler } from "react";
import { Route, withRouter } from "react-router";
import TextField from "material-ui/TextField";
import PlaylistTracks from "../MyPlaylistTracks";
import { Link } from "react-router-dom";
import { ROUTE_PLAYLIST, ROUTE_PLAYLISTS } from "../../../util/constants";
import FavoriteIconButton from "../../../widgets/FavoriteIconButton";
import DivInline from "../../../widgets/DivInline.";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    /*overflow: 'hidden',*/
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "auto"
    /*overflowY: 'hidden'*/
  },
  gridTileBar: {
    fontSize: 9
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

interface IProps {
  appState?: AppState;
  classes?: ClassNameMap<string>;
  history?: any;
  fontSize?: number;
}
@inject("appState")
@observer
class MyPlaylists extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
    debugger;
  }

  static defaultProps: Partial<IProps> = {
    fontSize: 40
  };

  renderItem(index, key) {
    return (
      <div key={key}>
        <img src={this.props.appState.userPerformers[index].picture_medium} />
      </div>
    );
  }

  render() {
    const classes: ClassNameMap<string> = this.props.classes;
    /*
      const imatges = this.props.appState.userPerformers.map(art => {
        return <Col lg={3}><img src={art.PictureMediumURL} style={{display: "inline"}}/></Col>
      });
      return (0
        <Grid fluid={true}>
          <Row>
            {imatges}
          </Row>
        </Grid>
      );
*/
    /*
      return (<div style={{overflow: 'auto', maxHeight: 400}}>
        <ReactList
          itemRenderer={this.renderItem}
          length={this.props.appState.userPerformers.length}
          type='uniform'
        />
      </div>)
*/
    const COLS = 5;
    return (
      <GridList cellHeight={350} cols={COLS} style={{ overflow: "hidden" }}>
        <GridListTile
          key="Subheader"
          cols={COLS}
          style={{ height: 40, margin: 0, padding: 0 }}
        >
          <Subheader component="div" style={{ margin: 0, padding: 0 }}>
            <TextField
              id="filtrePerformers"
              placeholder="Filter by Playlist Name"
              className={style({
                width: "100%",
                fontSize: 50,
                margin: 0,
                padding: 0,
                paddingLeft: 4
              })}
              margin="none"
              onChange={(e: any) => {
                this.props.appState.filterByArtistNsme(e.target.value);
              }}
            />
          </Subheader>
        </GridListTile>
        {this.props.appState.userPlaylists.map((playlist, index) => {
          return (
            <GridListTile
              key={playlist.id}
              className={style({ cursor: "pointer" })}
              onClick={(e: any) => {
                e.stopPropagation();
                const path = ROUTE_PLAYLIST.replace(
                  ":playlistId",
                  playlist.id.toString()
                );
                this.props.appState.goActivePlayList(playlist.id);
              }}
            >
              <DivInline
                style={{
                  position: "absolute",
                  zIndex: 1000,
                  top: 0,
                  right: 0,
                  fontSize: "white"
                }}
              >
                <FavoriteIconButton
                  onClick={(e: any) => {
                    e.stopPropagation();
                    this.props.appState.unFavoritePlayList(playlist.id);
                  }}
                  color="white"
                />
              </DivInline>
              <img src={playlist.picture_medium} alt={playlist.title} />
              <GridListTileBar
                className={classes.gridTileBar}
                title={<span style={{ fontSize: 12 }}>{playlist.title}</span>}
                subtitle={
                  <div>
                    <a href={playlist.link}>
                      <span style={{ fontSize: 11 }}>
                        {playlist.nb_tracks} traks and {playlist.fans} fans
                      </span>
                      {/*<input type={"text"} value={playlist.id} />*/}
                    </a>
                  </div>
                }
              />
            </GridListTile>
            /*</Link>*/
          );
        })}
      </GridList>
    );
  }
}

//export default App;
export default withRouter(withStyles(styles as any)(MyPlaylists as any) as any);
