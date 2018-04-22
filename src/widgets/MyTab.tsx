import * as React from "react";
import { AppState, TMyTab } from "../stores/AppStore";
import { inject, observer } from "mobx-react";
import { FUNNY_FONT, INFO_FONT, MARGIN_LEFT } from "../util/constants";
import Tabs, { Tab } from "material-ui/Tabs";
import paleta from "../util/paleta";
import "./MyTab.css";

interface IProps {
  appState?: AppState;
}
@inject("appState")
@observer
class MyTab extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps = {};

  /*
  render() {
    const tabs = this.props.appState.tabDataSet.map((tab, index: number) => {
      return <Tab value={index} title={tab.title} onClick={() => {
        this.props.appState.setTabActiveIndex(index);
      }}/>
    });
    return <Tabs value={this.props.appState.tabActiveIndex}>{tabs}</Tabs>
  }
*/
  render() {
    const Tabs = this.props.appState.tabDataSet.map((tab, index: number) => {
      const isActive = this.props.appState.tabActiveIndex === index;
      const fontSize = isActive ? 25 : 25;
      //const borderBottom = (isActive) ? "solid black 4px" : "none";
      const fontWeight =
        this.props.appState.tabActiveIndex === index ? 900 : 700;
      return (
        <div
          className={"li " + "tabItem" + (isActive ? " active" : "")}
          style={{
            textAlign: "center",
            display: "inline",
            width: "100%",
            padding: 0,
            margin: 0
          }}
          key={index}
          onClick={(e: any) => {
            if (tab.onEnter) {
              tab.onEnter();
            }
            this.props.appState.setTabActiveIndex(index);
          }}
        >
          <div>
            <span
              style={{
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: FUNNY_FONT,
                display: "inline",
                paddingRight: 2
              }}
            >
              my
            </span>
            <span
              style={{
                fontFamily: FUNNY_FONT,
                fontSize: fontSize,
                fontWeight: fontWeight,
                display: "inline",
                cursor: "pointer"
              }}
            >
              {tab.title}
            </span>
            {tab.count && (
              <span
                className={"tabCount"}
                style={{
                  fontFamily: INFO_FONT,
                  marginLeft: 5,
                  fontSize: 14,
                  fontWeight: 900,
                  color: paleta.accentColor2
                }}
              >
                {tab.count()}
              </span>
            )}
          </div>
        </div>
      );
    });
    return (
      <div
        id="my-tab"
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 0,
          width: "100%",
          height: 35,
          padding: 0
        }}
      >
        {Tabs}
      </div>
    );
  }
}

export default MyTab;
