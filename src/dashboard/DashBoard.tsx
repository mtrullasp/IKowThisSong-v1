/**
 * EDICIÓ GIFs animats ONLINE:
 * https://ezgif.com
 *
 * MEMBER 1 any
 * https://www.storyblocks.com
 *
 * ESQUEMA CENTRAL A SEGUIR, AMB 3 OPCIONS
 * https://www.webpagefx.com/blog/web-design/google-fonts-examples/
 *
 * AQUESTES ICONES:
 * https://icons8.com/icon/set/music%20discovering/wired
 *
 */
import * as React from "react";
import { FUNNY_FONT, INFO_FONT, ROUTE_DISCOVER } from "../util/constants";
import { CSSProperties } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { style } from "typestyle";
import ParagraphBootstrap from "./ParagraphBootstrap.";
import { AppState } from "../stores/AppStore";
import { inject, observer } from "mobx-react";

const PANEL_HEIGHT = 400;

interface IProps {
  appState?: AppState;
}
@inject("appState")
@observer
class DashBoard extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {};

  render() {
    const headerStyle: CSSProperties = {
      textAlign: "center"
    };
    const paragraphStyle: CSSProperties = {
      textAlign: "left",
      fontSize: 18
    };
    return (
      <div>
        <h1
          style={{
            display: "block",
            textAlign: "center",
            width: "100%",
            fontSize: 20,
            color: "#36454f",
            fontFamily: INFO_FONT,
            fontWeight: 900
          }}
        >
          Discover, listen and Test Your Musical Knowledge
        </h1>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            position: "fixed",
            bottom: -20
          }}
        >
          <img
            src="/src/img/HiFiRetro.png"
            style={{ width: 700, marginRight: 80 }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "5%",
            right: "5%",
            fontFamily: INFO_FONT
          }}
        >
          <span>Powered by </span>
          <a href="http://www.deezer.com" target="_blank">
            <img src="/src/img/deezer.png" />
          </a>
        </div>

        <div
          style={{
            fontFamily: INFO_FONT,
            fontSize: 16,
            display: "block",
            position: "absolute",
            left: 30,
            bottom: 50
          }}
        >
          by MTP Musical Software Studio
        </div>

        <div style={{ justifyContent: "center", width: "100%" }}>
          <Grid fluid={false}>
            <Row center={"lg"}>
              <Col lg={12}>
                <Row>
                  {/*
                  <Col lg={4}>
                    <img src="/src/img/3d-search-icon_G1pTHKtu_L.png" style={{ width: "100%" }}/>
                  </Col>
                  <Col lg={4}>
                    <img src="/src/img/3d-speaker_M10pBtYu_L.png" style={{ width: "100%" }}/>
                  </Col>
                  <Col lg={4}>
                    <img src="/src/img/Question2.jpg" style={{ width: "100%" }}/>
                  </Col>
*/}
                  <Col lg={4} className={style({ fontFamily: INFO_FONT })}>
                    <ParagraphBootstrap
                      className="marketing-column"
                      height={PANEL_HEIGHT}
                      onClick={() => {
                        this.props.appState.go(ROUTE_DISCOVER);
                      }}
                    >
                      <header>
                        <img src="/src/img/Discover.jpg" />
                      </header>
                      <h3 style={headerStyle}>
                        <b>DISCOVER CLASSICAL MUSIC</b>
                      </h3>
                      <p style={paragraphStyle}>
                        Do You like Classical Music? Come in with us and it
                        will, for sure! Discover what is the Classica that You
                        loves today And the Classica that You will love
                        tomorrow.
                      </p>
                      <p style={paragraphStyle}>
                        Create this way, almost without realizing your own{" "}
                        <b>Ideal Classical Music Library</b>, adapted to your
                        level and your tastes according to the exclusive
                        Collaborative{" "}
                        <b>
                          <i>KlassicRank System ™</i>
                        </b>.
                      </p>
                    </ParagraphBootstrap>
                  </Col>
                  <Col lg={4} className={style({ fontFamily: INFO_FONT })}>
                    <ParagraphBootstrap height={PANEL_HEIGHT}>
                      <header>
                        <img src="/src/img/Listen.jpg" />
                      </header>
                      <h3 style={headerStyle}>
                        <b>LISTEN YOUR CLASSICAL MUSIC</b>
                      </h3>
                      <p style={paragraphStyle}>
                        Relax and enjoy the Music of Your Library randomly
                        through your{" "}
                        <a href="http://www.deezer.com/offers">
                          Premium Account
                        </a>{" "}
                        in our streaming partner, <b>Deezer</b>.
                      </p>
                      <p style={paragraphStyle}>
                        Or better yet,{" "}
                        <a href="https://www.deezer.com/offers/hifi">
                          <b>Deezer HiFi</b>
                        </a>, if you have a Hi-Fi Sound System, to listen to the
                        Best Music with the best quality of <b>HQ Sound!</b>
                      </p>
                    </ParagraphBootstrap>
                  </Col>
                  <Col lg={4} className={style({ fontFamily: INFO_FONT })}>
                    <ParagraphBootstrap height={PANEL_HEIGHT}>
                      <header>
                        <img src="/src/img/Test.jpg" />
                      </header>
                      <h3 style={headerStyle}>
                        <b>TEST YOUR CLASSICAL MUSIC KNOWLEDGE</b>
                      </h3>
                      <p style={paragraphStyle}>
                        Come on! It's time to play and test your knowledge of
                        Classical Music, we do not doubt that they are "In
                        crescendo".
                      </p>
                      <p style={paragraphStyle}>
                        Compare your results with the people in your Circles:
                        Family, Friends, Groups, City, Country and WorldWide.
                        Sharpen your ear and cause admiration!
                      </p>
                    </ParagraphBootstrap>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default DashBoard;
