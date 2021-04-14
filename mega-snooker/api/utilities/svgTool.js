const svgConvertor = require('svg-to-jsx')
const simpleSvgTools = require('simple-svg-tools');
const fs = require('fs');

module.exports = class svgTool {

    /**
     * Converts SVG file into usable JSX syntax
     * 
     * @param {SVG} svg
     * @returns {JSX} jsx 
     */
    convertSVGtoJSX(svg) {
        console.log(svg);
        return new Promise(resolve => {
            simpleSvgTools.ImportSVG(svg).then(img => {
                console.log(img.toString());
                svgConvertor(img.toString())
                    .then(jsx => {
                        console.log(jsx)
                        console.log('converted to jsx');
                        resolve(img.toString());
                    })
                    .catch(error => {
                        if (error) console.error(error);
                    })
            }).catch(err => {
                console.log(err);
            });
        });
    }

}