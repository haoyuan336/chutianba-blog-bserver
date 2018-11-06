import React from 'react'
let Button = React.Component({
    handleClick() {
        console.log('click  = ' + this.props.id);
    },
    render() {
        return (
            <li style={{
                color: '#ffffff',
                cursor: "pointer"
            }} onClick={this.handleClick}>{this.props.label}
            </li>
        )
    }
});
let ButtonNameList = ['大富翁', '切水果', '捕鱼达人']
let LeftMenu = React.Component({
    render() {

        let children = [];
        for (let i = 0; i < ButtonNameList.length; i++) {
            children.push(
                <Button id={i} label={ButtonNameList[i]} key={i}></Button>
            )
        }

        return (
            <div style={{
                position: "fixed",
                left: 0,
                top: "60px",
                width: "250px",
                bottom: 0,
                overflow: "auto",
                backgroundColor: "#2b3595"
            }}><ul>
                    {children}
                </ul></div>
        )
    }
});
export default LeftMenu;