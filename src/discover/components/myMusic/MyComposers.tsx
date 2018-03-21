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
class MyComposers extends React.Component<IProps, {}> {º
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps: Partial<IProps> = {
    fontSize: 40
  };

  renderItem(index, key) {
    return (
      <div key={key}>
        <img src={this.props.appState.composers[index].picture_medium} />
      </div>
    );
  }

  render() {
    const classes: ClassNameMap<string> = this.props.classes;
    /*
      const imatges = this.props.appState.usercomposers.map(art => {
        return <Col lg={3}><img src={art.picture_medium} style={{display: "inline"}}/></Col>
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
          length={this.props.appState.usercomposers.length}
          type='uniform'
        />
      </div>)
*/
    const NUMBER_COLS = 5;
    return (
      <GridList cellHeight={400} cols={NUMBER_COLS} className={style({width: '100%'})}>
        <GridListTile
          key="Subheader"
          cols={NUMBER_COLS}
          style={{ height: 50, padding: 0, margin: 0 }}
        >
          <Subheader component="div" style={{ margin: 0, padding: 0 }}>
            <TextField
              id="filtrecomposers"
              placeholder={'Filter by Name'}
              className={style({
                width: "100%",
                fontSize: 50,
                fontFamily: FUNNY_FONT
              })}
              margin="none"
              onChange={(e: any) => {
                this.props.appState.filterByComposerNsme(e.target.value);
              }}
            />
          </Subheader>
        </GridListTile>
        {this.props.appState.composers.map((composer, index) => (
          <GridListTile
            key={composer.IdAutor}
            className={style({ cursor: "pointer" })}
          >
            <img src={composer.picture_medium} alt={composer.Nom} />
            <GridListTileBar
              className={classes.gridTileBar}
              title={<span style={{ fontSize: 12 }}>{composer.Nom}</span>}
              subtitle={
                <div>
{/*
                  <span style={{ fontSize: 11 }}>
                    {composer.nb_album} àlbumsi {composer.nb_fan} fans
                  </span>
*/}
                  <span
                    style={{
                      position: "relative",
                      right: 0,
                      color: "white",
                      marginLeft: 10,
                      fontSize: 16
                    }}
                  >
                    {composer.IdAutor}
                  </span>
                </div>
              }
/*
              actionIcon={
                <IconButton className={classes.icon}>
                  <a
                    href={composer.link}
                    onClick={(e: any) => {
                      e.stopPropagation();
                    }}
                  >
                    <InfoIcon />
                  </a>
                </IconButton>
              }
*/
            />
          </GridListTile>
        ))}
      </GridList>
    );
  }
}

//export default App;
export default withRouter(withStyles(styles as any)(MyComposers as any) as any);
