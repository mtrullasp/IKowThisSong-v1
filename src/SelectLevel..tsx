import * as React from "react";

interface IProps {

}
class SelectLevel extends React.Component<IProps, {}> {
    constructor(props: IProps, context: any) {
        super(props, context);
    }

    static defaultProps = {};

    render() {
    	return (<div>Levels</div>);
    }
}

export default SelectLevel;