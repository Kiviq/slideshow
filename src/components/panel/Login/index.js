import React, { Component } from 'react';
// import Input from '../Form/input';
import Header from '../Header';
import './login.css'
class Login extends Component {
	constructor(){
		super()
		this.state = {
			login:'',
			password:'',
			formErrors: {
				email: '', 
				password: ''
			},
			emailValid: false,
			passwordValid: false,
			formValid: false
		}
		this.redirect = this.redirect.bind(this);

		// this.handleLogin = this.handleLogin.bind(this);
		// this.handlePassword = this.handlePassword.bind(this);
		// this.handleFocusOut = this.handleFocusOut.bind(this);
	}
	redirect(e){
		e.preventDefault();
		if (this.state.formValid){
			console.log('puszczam');
			window.location.pathname = '/create';
		} else{
			alert('złe dane ziomeczku')
		}
		console.log('elo', window.AppState, this.state)

	}
	handleUserInput (e) {
		const name = e.target.name; // nazwa pola
		const value = e.target.value; // wartosc
		this.setState({[name]: value}, 
		() => { this.validateField(name, value) });
	}
	handleUserInputPassword (e) {
		const name = e.target.name; // nazwa pola
		const value = e.target.value; // wartosc
		this.setState({[name]: value}, 
		() => { this.validateField(name, value) });
	}
	validateField(fieldName, value) {
	  let fieldValidationErrors = this.state.formErrors;
	  let emailValid = this.state.emailValid;
	  let passwordValid = this.state.passwordValid;

	  switch(fieldName) {
	    case 'login':
	    	value.length > 5 ? emailValid = true : emailValid = false;
	      	fieldValidationErrors.email = 'Podany login jest nie prawidłowy';
	      break;
	    case 'password':
			passwordValid = value.length >= 6;
			fieldValidationErrors.password = 'Hasło jest nie prawidłowe';
	      break;
	    default:
	      break;
	  }
	  console.log(emailValid, 'valid?')
	  	this.setState(
		  	{formErrors: fieldValidationErrors,
	          emailValid: emailValid,
	          passwordValid: passwordValid
	        },
	        this.validateForm
        );
	}
	validateForm() {
	  this.setState({formValid: this.state.emailValid && this.state.passwordValid});
	}
	errorClass(value) {
		console.log(value)
		return (this.state.login.length > 5 || this.state.login.length === 0 ? '' : 'error');
	}
	errorClassPassword(value) {
		return (this.state.password.length > 6 || this.state.password.length === 0 ? '' : 'error');
	}
	render() {
		return (
			<div className="login">
				<form className="login_form" post="/">
					<div className={this.errorClass('login') +" input_cont login "}>
						<label>Login</label>
						<input type="text" value={this.state.login} name="login" onChange={(event) => this.handleUserInput(event)} className={this.errorClass('login')}/> 
					</div>
					<div className={this.errorClassPassword('password') +" input_cont password "}>
						<label>Hasło</label>
						<input type="password" value={this.state.password} onChange={(event) => this.handleUserInputPassword(event)} name="password" className={this.errorClassPassword('password')}/> 
					</div>
					<button type="submit" onClick={this.redirect} className="submit_login" disabled={!this.state.formValid}>Wpuść mnie</button>
				</form>
			</div>
		);
	}

}
 export default Login;