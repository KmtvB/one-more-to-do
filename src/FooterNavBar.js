import React, { Component } from 'react';
import Line from './Line';
import './css/footer.css'

export class FooterNavBar extends Component {
    render() {
        const rightArea = 0;
        const leftArea = (
            <div class="nav-panel">
                <div class="nav-button-prev nav-button-inactive">
                    <div class="nav-icon prev-icon"></div>
                    <span>Previous</span>
                </div>
                <div class="nav-button-next">
                    <span>Next</span>
                    <div class="nav-icon next-icon"></div>
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