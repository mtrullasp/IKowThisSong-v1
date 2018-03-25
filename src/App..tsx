import * as React from "react";
import { Route, Switch, withRouter } from "react-router";
import DashBoard from "./dashboard/DashBoard";
import Discover from "./discover/Discover.";
import {INFO_FONT, ROUTE_DISCOVER, ROUTE_PLAYLIST, SECONDARY_COLOR} from "./util/constants";
import { inject, observer } from "mobx-react";
import { AppState } from "./stores/AppStore";
import Header from "./Header.";
import AppDiscover from "./discover/components/AppDiscover";

import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import MyPlaylistTracks from "./discover/components/MyPlaylistTracks";

const theme = createMuiTheme({
  overrides: {
    MuiListItemText: {
      primary: {
        fontSize: 20,
        fontFamily: INFO_FONT
      },
      secondary: {
        color: SECONDARY_COLOR,
        fontSize: 18,
        fontFamily: INFO_FONT
      }
    },
    MuiButton: {
      root: {
        fontSize: 25,
        fontFamily: INFO_FONT
      }
    }
  }
});

interface IProps {
  appState?: AppState;
  history?: any;
}
@inject("appState")
@observer
class App extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
    debugger;
    props.appState.setHistory(this.props.history);
  }

  static defaultProps = {};

  render() {
    return <div>
        <MuiThemeProvider theme={theme}>
          <Header />
          <Switch>
            <Route path="/" exact={true} component={DashBoard} />
            <Route path={ROUTE_DISCOVER} exact={false} component={AppDiscover} />
            <Route path={ROUTE_PLAYLIST} component={MyPlaylistTracks} exact />
          </Switch>
        </MuiThemeProvider>
      </div>;
  }
}

export default withRouter(App as any);
