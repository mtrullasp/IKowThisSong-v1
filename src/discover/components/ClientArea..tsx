import * as React from "react";

interface IProps {

}
class ClientArea extends React.Component<IProps, {}> {
    constructor(props: IProps, context: any) {
        super(props, context);
    }

    static defaultProps = {};

    state = {};

    refs: {};

    render() {
    	return (<div>Client Area</div>);
    }
}

export default ClientArea;