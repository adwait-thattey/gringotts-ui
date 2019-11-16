import React from 'react';
import './login.css';

const login =(props) => {

    return(
        <div className="container">
            <form className="form col s12" id="reg-form">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" onChange={props.changedEmail} required />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate" onChange={props.changedPassword}  required />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <button className="btn btn-large btn-register" type="submit" onClick={(e) => props.logIn(e)}>
                            Log In
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default login;

