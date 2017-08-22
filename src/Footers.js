import React, { Component } from 'react';
import Line from './Line';
import './css/footer.css';

function Footer(props) {
    return (
        <div className="footer">
            {props.children}
        </div>
    );
}

class FooterNavBar extends Component {
    render() {
        const leftArea = (<div className="left-empty"></div>);
        const rightArea = (
            <div className="nav-panel">
                <div onClick={this.props.prevOnClick} className={"nav-button nav-button-prev " + (this.props.isPrevActive ? '' : 'nav-button-inactive')}>
                    <div className="nav-icon prev-icon"></div>
                    <span>Previous</span>
                </div>
                {this.props.isNextAsNewPage ? (
                    <div onClick={this.props.nextOnClick} className={"nav-button nav-button-new"}>
                        <span>New page</span>
                        <div className="nav-icon new-icon"></div>
                    </div>
                ) : (
                    <div onClick={this.props.nextOnClick} className={"nav-button nav-button-next"}>
                        <span>Next</span>
                        <div className="nav-icon next-icon"></div>
                    </div>
                )}
            </div>
        );
        return (
            <Line
                left={leftArea}
                right={rightArea}
            />
        );
    }
}

class FooterDialog extends Component {
    render() {
        const leftArea = (<div className="left-empty"></div>);
        const rightArea = (<div className="dialog-panel">
            <div className="dialog-button button-no" onClick={this.props.noOnClick}>No</div>
            <div className="dialog-button button-yes" onClick={this.props.yesOnClick}>Yes</div>
        </div>);
        return (
            <Line
                left={leftArea}
                right={rightArea}
            />
        );
    }
}

export { FooterDialog, FooterNavBar, Footer };
