import React from 'react'
let Header = React.createClass({
    render(){
        return(
            <div style={{
                position: "fixed",
                left: 0,
                top:0,
                width: '100%',
                height: '60px',
                backgroundColor: '#182952'
            }}>
                <strong><h1 style={{
                    width: "160px",
                    height: "33px",
                    display: "block",
                    color: "#ffffff"
                }}>React学习</h1></strong>
            </div>
        )
    }
});
export default Header;