import * as React from "react";
import { AppState, TMyTab } from "../stores/AppStore";
import { inject, observer } from "mobx-react";
import { FUNNY_FONT, INFO_FONT } from "../util/constants";

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

  render() {
    const Tabs = this.props.appState.tabDataSet.map((tab, index: number) => {
      const fontSize = this.props.appState.tabActiveIndex === index ? 50 : 40;
      const fontWeight =
        this.props.appState.tabActiveIndex === index ? 900 : 700;
      return (
        <li
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
        </li>
      );
    });
    return (
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: 20,
          padding: 0
        }}
      >
        {Tabs}
      </ul>
    );
  }
}

export default MyTab;
