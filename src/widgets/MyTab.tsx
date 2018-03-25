import * as React from "react";
import { AppState, TMyTab } from "../stores/AppStore";
import { inject, observer } from "mobx-react";
import { FUNNY_FONT, INFO_FONT } from "../util/constants";
import Tabs, { Tab } from "material-ui/Tabs";

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
      const fontSize = isActive ? 40 : 40;
      //const borderBottom = (isActive) ? "solid black 4px" : "none";
      const fontWeight =
        this.props.appState.tabActiveIndex === index ? 900 : 700;
      return (
        <div
          style={{
            display: "inline",
            marginRight: 40
          }}
          key={index}
          onClick={(e: any) => {
            if (tab.onEnter) {
              tab.onEnter();
            }
            this.props.appState.setTabActiveIndex(index);
          }}
        >
          <div className={"tabItem" + (isActive ? " active" : "")} >
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
                style={{
                  fontFamily: FUNNY_FONT,
                  marginLeft: 5,
                  fontSize: 25,
                  fontWeight: 900,
                  color: "red"
                }}
              >
                {tab.count}
              </span>
            )}
          </div>
        </div>
      );
    });
    return (
      <div
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: 50,
          padding: 0
        }}
      >
        {Tabs}
      </div>
    );
  }
}

export default MyTab;
