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

interface IState {
  goBackIsEnter: boolean;
  goFordwardIsEnter: boolean;
}
interface IProps {
  appState?: AppState;
}
@inject("appState")
@observer
class Header extends React.Component<IProps, IState> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  state: IState = {
    goBackIsEnter: false,
    goFordwardIsEnter: false
  };

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
            <Col lg={3} className={style({ display: "inline-flex" })}>
              <DivInline style={{ marginRight: 20 }}>
                {this.props.appState.canGoBack && (
                  <SelectablePanel
                    width={70}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      this.props.appState.goBack();
                    }}
                    onMouseEnter={() => {
                      this.setState({ goBackIsEnter: true });
                    }}
                    onMouseLeave={() => {
                      this.setState({ goBackIsEnter: false });
                    }}
                    isHovered={this.state.goBackIsEnter}
                  >
                    <img
                      src="/src/img/icons/arrow1-left_64.png"
                      style={{ textAlign: "center" }}
                    />
                  </SelectablePanel>
                )}
              </DivInline>
              <DivInline>
                {this.props.appState.canGoForward && (
                  <SelectablePanel
                    width={70}
                    onClick={() => this.props.appState.goForward()}
                    onMouseEnter={() => {
                      this.setState({ goFordwardIsEnter: true });
                    }}
                    onMouseLeave={() => {
                      this.setState({ goFordwardIsEnter: false });
                    }}
                    isHovered={this.state.goFordwardIsEnter}
                  >
                    <img
                      src="/src/img/icons/arrow1-right_64.png"
                      style={{ textAlign: "center" }}
                    />
                  </SelectablePanel>
                )}
              </DivInline>
            </Col>
            <Col lg={6}>
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
            <Col lg={3} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Header;
