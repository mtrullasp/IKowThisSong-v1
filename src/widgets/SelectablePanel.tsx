import * as React from "react";
import Paper from "material-ui/Paper";

interface IProps {
  height?: number | string;
  width?: number | string;
  isSelected?: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  padding?: number;
  cursor?: string;
  onClick?: (e: any) => void;
  zIndex?: number;
  className?: string;
}
class SelectablePanel extends React.Component<IProps, {}> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps: Partial<IProps> = {
    isSelected: false,
    isHovered: false,
    padding: 20,
    cursor: "pointer",
    zIndex: 100,
    onClick: () => {}
  };

  render() {
    const elevation = this.props.isSelected || this.props.isHovered ? 15 : 0;
    return (
      <Paper
        style={{
          padding: this.props.padding,
          cursor: this.props.cursor,
          height: this.props.height,
          width: this.props.width,
          zIndex: this.props.zIndex
        }}
        className={this.props.className}
        elevation={elevation}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </Paper>
    );
  }
}

export default SelectablePanel;
