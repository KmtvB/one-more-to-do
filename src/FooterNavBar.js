import React, { Component } from 'react';
import Line from './Line';
import './css/footer.css'

export class FooterNavBar extends Component {
    render() {
        const leftArea = (<div></div>);
        const rightArea = (
            <div className="nav-panel">
                <div onClick={this.props.prevOnClick} className={"nav-button-prev " + (this.props.isPrevActive ? '' : 'nav-button-inactive') }> 
                    <div className="nav-icon prev-icon"></div>
                    <span>Previous</span>
                </div>
                <div onClick={this.props.nextOnClick} className={"nav-button-next " + (this.props.isNextActive ? '' : 'nav-button-inactive')}>
                    <span>Next</span>
                    <div className="nav-icon next-icon"></div>
                </div>
            </div>
        );
        return (
            <div className="footer">
                <Line 
                    left={leftArea}
                    right={rightArea}
                />
            </div>
        );
    }
}

export default FooterNavBar;