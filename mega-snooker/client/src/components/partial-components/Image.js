import React, { Component, useRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server';
import SVG, { Props as SVGProps } from 'react-inlinesvg';

const apiTool = require('./../../utilities/apiTool');
const API = new apiTool();

class Fragment extends Component {
    constructor(props) {
        super(props);
        this.state = { assets: "" };
    }

//    const Logo = React.forwardRef<SVGElement, SVGProps>((props, ref) => (
//        <SVG innerRef={ref} title="MyLogo" {...props} />
//    ));


    componentDidMount() {
        API.fetchAsset('balls', 'Freesample').then(res => {
/*            console.log(res);
            const svgString = encodeURIComponent(renderToStaticMarkup(res));

            const dataUri = `url("data:image/svg+xml,${svgString}")`;
            this.setState({ assets: dataUri });*/
            this.setState({ assets: res });
        })
    }

    render() {
        return <img src={this.state.assets} alt="Test failed"/>;
    }
}


class Image extends Component {

    render() {
        const svgString = encodeURIComponent(renderToStaticMarkup(<Fragment />));
        const dataUri = `url("data:image/svg+xml,${svgString}")`;
        return (
            <div
                className='Image'
                style={{
                    background: dataUri,
                    width: 500,
                    height: 500,
                }}
            />
        );
    }
}

export default Image;