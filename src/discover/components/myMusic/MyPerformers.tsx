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
import { withRouter } from "react-router";
import TextField from "material-ui/TextField";
import { FUNNY_FONT } from "../../../util/constants";

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
    height: "auto",
    overflowY: 'auto'
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
class MyPerformers extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
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
    const NUMBER_COLS = 5;
    const CELL_HEIGHT = 350;
    return (
      <GridList cellHeight={CELL_HEIGHT} cols={NUMBER_COLS} className={style({width: '100%'})}>
        <GridListTile
          key="Subheader"
          cols={NUMBER_COLS}
          style={{ height: 50, padding: 0, margin: 0 }}
        >
          <Subheader component="div" style={{ margin: 0, padding: 0 }}>
            <TextField
              id="filtrePerformers"
              placeholder={this.props.appState.filterByKindArtist}
              className={style({
                width: "100%",
                fontSize: 50,
                fontFamily: FUNNY_FONT
              })}
              margin="none"
              onChange={(e: any) => {
                this.props.appState.filterByArtistNsme(e.target.value);
              }}
            />
          </Subheader>
        </GridListTile>
        {this.props.appState.userPerformers.map((artist, index) => (
          <GridListTile
            key={artist.id}
            className={style({ cursor: "pointer" })}
            onClick={() => {
              if (artist.isComposer) {
                this.props.appState.userPerformersFromApi.find(
                  a => a.id === artist.id
                ).picture_medium = prompt("Foto");

                this.props.appState.setFotos();
              } else {
                this.props.appState.toggleComposer(artist.id);
              }
              //this.props.appState.artistIdActive = artist.id;
              //this.props.appState.goArtistTracks(artist.id);
              /*
              DZ.api("artist/" + artist.id + "/comments", "POST", {
                comment: '{"composer": true}'
              });
*/
            }}
          >
            <img src={artist.picture_medium} alt={artist.name} />
            <GridListTileBar
              className={classes.gridTileBar}
              title={<span style={{ fontSize: 12 }}>{artist.name}</span>}
              subtitle={
                <div>
                  <span style={{ fontSize: 11 }}>
                    {artist.nb_album} àlbumsi {artist.nb_fan} fans
                  </span>
                  <span
                    style={{
                      position: "relative",
                      right: 0,
                      color: "white",
                      marginLeft: 10,
                      fontSize: 16
                    }}
                  >
                    {artist.id}
                  </span>
                  <span
                    style={{
                      display: "flexbox",
                      justifyContent: "space-around",
                      fontSize: 12,
                      color: "white"
                    }}
                  >
                    {artist.isComposer ? "C" : ""}
                  </span>
                </div>
              }
              actionIcon={
                <IconButton className={classes.icon}>
                  <a
                    href={artist.link}
                    onClick={(e: any) => {
                      e.stopPropagation();
                    }}
                  >
                    <InfoIcon />
                  </a>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    );
  }
}

//export default App;
export default withRouter(withStyles(styles as any)(MyPerformers as any) as any);
