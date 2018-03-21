import * as React from "react";
import SelectablePanel from "../widgets/SelectablePanel";

interface IState {
  isHovered: boolean;
}
interface IProps {
  onClick?: () => void;
  height?: number;
  className?: string;
}
class ParagraphBootstrap extends React.Component<IProps, IState> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  static defaultProps: Partial<IProps> = {
    onClick: () => {}
  };

  state = {
    isHovered: false
  };

  private handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  private handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  render() {
    return (
      <SelectablePanel
        height={this.props.height}
        className={this.props.className}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        onClick={this.props.onClick}
        isHovered={this.state.isHovered}
      >
        {this.props.children}
      </SelectablePanel>
    );
  }
}
0
export default ParagraphBootstrap;
