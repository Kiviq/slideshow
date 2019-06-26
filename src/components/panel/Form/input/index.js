import React, { Component } from 'react';
import './input.css'
class Input extends Component {
	constructor(){
		super();
		this.state = {
			value:'',
			length:0,
			isClear:true,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleFocusOut = this.handleFocusOut.bind(this);
	}
	handleChange(event) {

	this.setState({value: event.target.value});
		this.setState({length: event.target.value.length});
		if (this.state.length > 5 && !this.state.isClear){
			this.setState({isClear: true});
			window.AppState.isClear = true;
		} else if (this.state.length < 6 && this.state.isClear){
			this.setState({isClear: false});
			window.AppState.isClear = false;
		}
	}
	handleFocusOut(event) {
		this.setState({value: event.target.value});
		this.setState({length: event.target.value.length});
		if (this.state.length > 5 && !this.state.isClear){
			this.setState({isClear: true});
			window.AppState.isClear = true;
		} else if (this.state.length < 6 && this.state.isClear){
			this.setState({isClear: false});
			window.AppState.isClear = false;
		}
	}
	checkError(){
		let isOkay;
		this.state.isClear ? isOkay = '' : isOkay = 'error'
		this.state.isClear ? window.AppState.isClear = true : window.AppState.isClear = false ;
		return isOkay;
	}
	render() {
		return (
			<div className="input_cont ">
				<label>{this.props.type.replace('Password', 'Hasło')}</label>
				<input onBlur={this.handleFocusOut} onChange={this.handleChange} type={this.props.type} name={this.props.type} min={this.props.minLet} className={this.checkError()}/>
			</div>
		);
	}
}

export default Input;