import React from 'react';
import './register.css';
const register = (props) => {
    return(
        <div className="container">
            <form className="form col s12" id="reg-form">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="username" type="text" className="validate" value={`${props.username}`} onChange={props.changedUsername} required />
                        <label htmlFor="username">Username</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" value={`${props.email}`} onChange={props.changedEmail} required />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate"  value={`${props.password}`} onChange={props.changedPassword} required />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <button className="btn btn-large btn-register" type="submit" onClick={(e) => props.register(e)} >Register
                            <i className="material-icons right">done</i>
                        </button>
                    </div>
                </div>
            </form>
            
        </div>
    )
}

export default register;