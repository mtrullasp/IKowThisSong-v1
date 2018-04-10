import * as React from "react";
import { Route, Switch, withRouter } from "react-router";
import DashBoard from "./dashboard/DashBoard";
import Discover from "./discover/Discover.";
import {
  INFO_FONT,
  ROUTE_DISCOVER,
  ROUTE_PLAYLIST,
  SECONDARY_COLOR
} from "./util/constants";
import { inject, observer } from "mobx-react";
import { AppState } from "./stores/AppStore";
import Header from "./Header.";
import AppDiscover from "./discover/components/AppDiscover";

import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import MyPlaylistTracks from "./discover/components/MyPlaylistTracks";
import Loader from "./widgets/Loader.";
import Content from "./Content.";

const theme = createMuiTheme({
  overrides: {
    MuiListItemText: {
      primary: {
        fontSize: 18,
        fontFamily: INFO_FONT
      },
      secondary: {
        color: SECONDARY_COLOR,
        fontSize: 16,
        fontFamily: INFO_FONT
      }
    },
    MuiButton: {
      root: {
        fontSize: 25,
        fontFamily: INFO_FONT
      }
    },
    MuiInput: {
      inputTypeSearch: {
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

    props.appState.setHistory(this.props.history);
  }

  static defaultProps = {};

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Loader isLoading={this.props.appState.isLoading}>
            <Switch>
              <Route path="/" exact={true} component={DashBoard} />
              <Route path="/content" exact={false} component={Content} />
            </Switch>
          </Loader>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(App as any);
