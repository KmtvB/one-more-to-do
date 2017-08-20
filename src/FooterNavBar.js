import React, { Component } from 'react';
import Line from './Line';
import './css/footer.css'

export class FooterNavBar extends Component {
    render() {
        const leftArea = (<div></div>);
        const rightArea = (
            <div className="nav-panel">
                <div className="nav-button-prev nav-button-inactive">
                    <div className="nav-icon prev-icon"></div>
                    <span>Previous</span>
                </div>
                <div className="nav-button-next">
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