import * as React from "react";
import { FUNNY_FONT, INFO_FONT } from "./util/constants";
import { AppState } from "./stores/AppStore";
import { inject, observer } from "mobx-react";
import { Grid, Row, Col } from "react-flexbox-grid";
import Button from "material-ui/Button";
import Icon from "material-ui/Icon";
import SelectablePanel from "./widgets/SelectablePanel";
import DivInline from "./widgets/DivInline.";
import { style } from "typestyle";
import ImageButton from "./widgets/ImageButton.";

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
        <Grid fluid>
          <Row>
            <Col lg={12}>
              <h3
                style={{
                  textAlign: "center",
                  letterSpacing: 4,
                  width: "100%",
                  display: "block",
                  fontSize: 80,
                  fontFamily: FUNNY_FONT,
                  fontWeight: 900,
                  margin: 0
                }}
              >
                I KNOW THIS SONG!
              </h3>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Header;
