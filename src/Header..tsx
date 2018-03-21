import * as React from "react";
import { FUNNY_FONT, INFO_FONT } from "./util/constants";
import { AppState } from "./stores/AppStore";
import { inject, observer } from "mobx-react";

interface IProps {
  appState?: AppState;
}
@inject("appState")
@observer
class Header extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  render() {
    return (
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          this.props.appState.goHome();
        }}
      >
        <h3
          style={{
            textAlign: "center",
            letterSpacing: 12,
            width: "100%",
            display: "block",
            fontSize: 80,
            fontFamily: FUNNY_FONT,
            fontWeight: 900,
            margin: 0
          }}
        >
          I   KNOW   THIS   SONG!
        </h3>
      </div>
    );
  }
}

export default Header;
