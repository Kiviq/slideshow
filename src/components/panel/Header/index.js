import React, { Component } from 'react';
import Logo from '../Logo'
import './header.css'
export class Header extends Component {
	render() {
		return (
			<div className="header">
				<Logo/>
			</div>
		);
	}
}
export default Header;