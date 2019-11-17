import React, {Component} from 'react';
import './auth.css';
import Login from '../../components/auth/login';
import Register from '../../components/auth/register';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';

import M from 'materialize-css';

class Auth extends Component{
    state = {
		authFields: {
			username: '',
			email: '',
			password: '',
		},
		message: null,
		error: null,
	}

	
		
    componentDidMount() {
		M.Tabs.init(this.Tabs);
	}
		
	fieldChangeHandler = (event, id) => {
		const authFields = {...this.state.authFields}
		switch(id){
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
		this.setState({	authFields: authFields,});
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
				this.setState({ message: response.data.success})
			})
			.catch(error => {
				console.log(error.response.data.err);
				this.setState({ error: error.response.data.err})
			})
	}

	logInHandler = (e) => {
		e.preventDefault();
		const user = { 
			email: this.state.authFields.email,
			password: this.state.authFields.password
		}
		axios.post('http://localhost:8000/api/auth/login', user)
			.then( response => {
				localStorage.setItem('AUTH_TOKEN', response.data);
				console.log(response.data);
				this.props.history.push('/dashboard');
			})
			.catch(error => {
				console.log(error.response.data.err)
				this.setState({ error: error.response.data.err})
			});
	}

    render(){
		console.log(this.state.message);
		let message = null;
        let error = null;		
		if(this.state.message){
			message =  <div className="alertDivMessage">
							<h5>{this.state.message}</h5>
						</div>
		}
		if(this.state.error){
			error =  <div className="alertDivError">
							<h5>{this.state.error}</h5>
						</div>
		}
		return(
            <Layout>
                <section>
					{message}
					{error}		
                    <div className='contDiv'>
					<div className="row"> 
						<ul ref={Tabs => {this.Tabs = Tabs;}} className="tabs col s12" >
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
							changedEmail = {(event) => this.fieldChangeHandler(event, 2)}
							changedPassword = {(event) => this.fieldChangeHandler(event, 3)}
							register = {this.registerHandler}
						/>
					</div>
					<div id="auth-login" className="login col s12">
						<Login 
							email={this.state.authFields.email} 
							password={this.state.authFields.password} 
							changedEmail = {(event) => this.fieldChangeHandler(event, 2)}
							changedPassword = {(event) => this.fieldChangeHandler(event, 3)}
							logIn = {this.logInHandler}
							/>
						</div>
                    </div>
                </section>
            </Layout>     
        );
    }
}


export default Auth;