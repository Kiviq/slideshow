import React, { Component } from 'react';
import LogoUrl from '../../../media/logo_slideshow.svg';
import './logo.css'
export class Logo extends Component {
	render() {
		return (
			<div className="logo_cont">
				<img src={LogoUrl} alt="logo"/>
			</div>
		);
	}
}

export default Logo;