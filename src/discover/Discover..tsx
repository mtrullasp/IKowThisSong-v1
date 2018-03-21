import * as React from "react";
import AppDiscover from "./components/AppDiscover";

interface IProps {}
class Discover extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {};

  render() {
    return <AppDiscover />;
  }
}

export default Discover;
