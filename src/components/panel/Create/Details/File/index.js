import React, { Component } from 'react';

class File extends Component {
	render(props) {
		return (
			<div className="result">
				<div className="result-move"></div>
				<div className="result-name">{this.props.name}</div>
				<div className="result-weight">{Math.floor(this.props.size) + 'kb'}</div>
				<div className="result-position">{this.props.position}</div>
				<div className="result-delete"></div>
			</div>
		);
	}
}

export default File;