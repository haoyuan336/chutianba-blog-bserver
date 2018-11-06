import React from 'react'
let Content = React.createClass({
    render(){
        return (
            <div style={{
                position: "fixed",
                left: "250px",
                right: 0,
                top: "60px",
                bottom: 0,
                // backgroundColor: "#7045af"
            }}>
            <canvas style={{
                position: "absolute",
                top: "100px",
                left: "100px",
                width: "800px",
                height: "480px",
                color: "#e14594"
            }} id="game-canvas">
            </canvas>
            </div>
        )
    }
});
export default Content;