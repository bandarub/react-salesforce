import React, { Component } from 'react';

import SideBar from './Sidebar'

class CoreLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuOpen: true
		};
    }
    handleToggleSideBar = () => {
		this.setState({ isMenuOpen: !this.state.isMenuOpen })
	}
	render() {
        const { isMenuOpen } = this.state;
        console.log(this.state)
		return (
			<div className="core-layout">
				<SideBar open={isMenuOpen} onToggle={this.handleToggleSideBar} />
				<div className="core-layout__content">
					<div className="main">{this.props.children}</div>
				</div>
			</div>
		);
	}
}

export default CoreLayout
