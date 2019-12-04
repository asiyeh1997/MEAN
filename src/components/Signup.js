import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			email: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}


	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	ValidateEmail(email) {
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (this.state.email.match(mailformat)) {
			return true;
		}
		else {
			alert("You have entered an invalid email address!");
			return false;
		}
	}

	handleUsernameError() {
		if (this.state.username === '') {
			return 'Username can not be empty'
		}
	}

	handleSubmit(event) {
		if (this.state.username === '') {
			return 'Username can not be empty'
		}
		else {
			event.preventDefault()
			axios.post('/user/', {
				username: this.state.username,
				password: this.state.password,
				confirmPassword: this.state.confirmPassword,
				email: this.state.email
			})
				.then(response => {
					console.log(response)
					if (!response.data.errmsg && (this.state.password == this.state.confirmPassword)) {
						console.log('successful signup')
						this.setState({ //redirect to login page
							redirectTo: '/login'
						})
					} else {
						console.log('username already taken')
					}
				}).catch(error => {
					console.log('signup error: ')
					console.log(error)

				})
		}
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="SignupForm">
					<h4>Sign up</h4>
					<form className="form-horizontal">
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="username">Username</label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									type="text"
									id="username"
									name="username"
									placeholder="Username"
									error={this.handleUsernameError()}
									helpertext={this.handleUsernameError}
									value={this.state.username}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="password">Password: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									placeholder="password"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="confirmPassword">Confirm Password: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									placeholder="confirm password"
									type="password"
									name="confirmPassword"
									value={this.state.confirmPassword}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="confirmPassword">Email: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									placeholder="Email"
									type="email"
									name="email"
									error={this.ValidateEmail()}
									helpertext={this.ValidateEmail()}
									value={this.state.email}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="form-group ">
							<div className="col-7"></div>
							<button
								className="btn btn-primary col-1 col-mr-auto"
								onClick={this.handleSubmit}
								type="submit"
							>Sign up</button>
						</div>
					</form>
				</div>
			)
		}
	}
}

export default Signup