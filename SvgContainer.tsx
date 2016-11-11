import * as React from 'react';

export interface SvgContainerProps {
    height: number;
    width: number;
}

export class SvgContainer extends React.Component<SvgContainerProps, {}> {
    render() {
        return <svg {...this.props}>{this.props.children}</svg>;
    }
}