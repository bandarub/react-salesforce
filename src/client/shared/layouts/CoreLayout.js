

import React, { Component } from 'react';

import SideBar from './Sidebar'

class CoreLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuOpen: true,
			isHover: false
		};
	}
	handleToggleSideBar = () => {
		this.setState({ isMenuOpen: !this.state.isMenuOpen })
	}
	handleHover = value => {
		this.setState({ isHover: value ? value : false })
	}
	render() {
		const { isMenuOpen, isHover } = this.state;
		let className = ["material-icons toggleIcon"]
		if (isMenuOpen) {
			className.push("toggleOut","hidden")
		}
		if(!isMenuOpen){
			className.push("toggleOut","display")

		}
		return (
			<div className="core-layout">
				{!isMenuOpen&&<i
					onClick={this.handleToggleSideBar}
					className={className.join(" ")}
				>
					chevron_right
				</i>}
				{isMenuOpen && <SideBar open={isMenuOpen} className={className} onToggle={this.handleToggleSideBar} handleHover={this.handleHover} />}
				<div className="core-layout__content">
					<div className="main">{this.props.children}</div>
				</div>
			</div>
		);
	}
}

export default CoreLayout

