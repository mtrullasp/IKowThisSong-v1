import * as React from "react";
import { Route, Switch, withRouter } from "react-router";
import DashBoard from "./dashboard/DashBoard";
import Discover from "./discover/Discover.";
import { ROUTE_DISCOVER } from "./util/constants";
import { inject, observer } from "mobx-react";
import { AppState } from "./stores/AppStore";
import Header from "./Header.";
import AppDiscover from "./discover/components/AppDiscover";

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
    return (
      <div>
        <Header />
        {/*<Switch>*/}
          <Route path="/" exact={true} component={DashBoard} />
          <Route path={ROUTE_DISCOVER} exact={false} component={AppDiscover} />
        {/*</Switch>*/}
      </div>
    );
  }
}

export default withRouter(App as any);
