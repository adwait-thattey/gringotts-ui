import React, { Component } from 'react';
import './auth.css';
import Login from '../../components/auth/login';
import Register from '../../components/auth/register';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import Webcam from 'react-webcam'
import { toast } from 'react-toastify';
import M from 'materialize-css';
import { withRouter } from 'react-router-dom';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

class Auth extends Component {
	state = {
		authFields: {
			username: '',
			email: '',
			password: '',
		},
		camera: {
			display: false,
			imageData: '',
			webcam: null
		}
	}

	componentDidMount() {
		M.Tabs.init(this.Tabs);
	}

	setRef = (webcam) => {
		const updatedCamera = { ...this.state.camera };
		updatedCamera.webcam = webcam;
		this.setState({ camera: updatedCamera });
	}

	capture = () => {
		const imageSrc = this.state.camera.webcam.getScreenshot();

		const updatedCamera = { ...this.state.camera };
		updatedCamera.imageData = imageSrc;
		this.setState({ camera: updatedCamera });
	}

	fieldChangeHandler = (event, id) => {
		const authFields = { ...this.state.authFields }
		switch (id) {
			case 1:
				authFields.username = event.target.value;
				break;
			case 2:
				authFields.email = event.target.value
				break;
			case 3:
				authFields.password = event.target.value
				break;
			default:

		}
		this.setState({ authFields });
	}

	registerHandler = (e) => {
		e.preventDefault();
		const user = {
			username: this.state.authFields.username,
			email: this.state.authFields.email,
			password: this.state.authFields.password
		}
		axios.post('http://localhost:8000/api/auth/register', user)
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error.message);
			})
	}

	logInHandler = (e) => {
		e.preventDefault();
		const user = {
			email: this.state.authFields.email,
			password: this.state.authFields.password
		}
		axios.post('http://localhost:8000/api/auth/login', user)
			.then(response => {
				localStorage.setItem('AUTH_TOKEN', response.data);
				toast.success("User successfully logged in");
				this.props.history.push('/dashboard');
			})
			.catch(error => {
				console.log(error);
				toast.error(error.response.data.err)
			});
	}

	render() {
		console.log(this.state.camera.imageData);
		return (
			<Layout>
				<section>
					<div className='contDiv'>
						<div className="row">
							<ul ref={Tabs => { this.Tabs = Tabs; }} className="tabs col s12" >
								<li className="tab col s6 "><a href="#auth-register">Register</a></li>
								<li className="tab col s6 "><a href="#auth-login">Login</a></li>
							</ul>
						</div>
						<div id="auth-register" className="register col s12">
							<Register
								username={this.state.authFields.username}
								email={this.state.authFields.email}
								password={this.state.authFields.password}
								changedUsername={(event) => this.fieldChangeHandler(event, 1)}
								changedEmail={(event) => this.fieldChangeHandler(event, 2)}
								changedPassword={(event) => this.fieldChangeHandler(event, 3)}
								register={this.registerHandler}
							/>
						</div>
						<div id="auth-login" className="login col s12">
							<Login
								email={this.state.authFields.email}
								password={this.state.authFields.password}
								changedEmail={(event) => this.fieldChangeHandler(event, 2)}
								changedPassword={(event) => this.fieldChangeHandler(event, 3)}
								logIn={this.logInHandler}
							/>
							<div className="webcam-comp">
								<Webcam
									audio={false}
									height={660}
									ref={this.setRef}
									screenshotFormat="image/jpeg"
									width={1000}
									videoConstraints={videoConstraints}
								/>
								<button onClick={this.capture}>Capture photo</button>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		);
	}
}


export default withRouter(Auth);