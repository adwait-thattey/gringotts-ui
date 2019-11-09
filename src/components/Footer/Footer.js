import React from 'react';
import './Footer.css';
import Logo from '../Logo/Logo';

const footer = (props) => (
    <footer className="page-footer #212121 grey darken-4">      
        <div className="row">
            <div className="col l4 s12 m12">
                <div style={{ width: '6rem', height : '6rem', display: 'inline-block',}}>    
                    <div style={{ marginTop: '12px'}}>
                            <Logo />
                    </div>
                </div>
                <h1 className="white-text" style={{display: 'inline-block', marginLeft: '15px'}}><b>Gringotts</b></h1>
                <p className="grey-text text-lighten-4">
                    A single sign-on manager to securely store any kind of
                    passwords, keys, credentials,  tokens or just any data.
                </p>
            </div>
            <div className="col l4 s12 m12">
                
            </div>
            <div className="col l4 s12 m12">
                <h3 className="white-text"><b>Services</b></h3>
                <ul>
                    <li><a className="white-text text-lighten-4" href="#!">Credentials Manager</a></li>
                    <li><a className="white-text text-lighten-4" href="#!">Dynamic Credentials</a></li>
                    <li><a className="white-text text-lighten-4" href="#!">SSH Keys</a></li>
                    <li><a className="white-text text-lighten-4" href="#!">GPG (Secured Transfer of Data)</a></li>
                </ul>
            </div>
        </div>       
        <div className="footer-copyright #1976d2 blue darken-2">
            <div style={{ margin: '0px auto', }}>
                <h5>@2019 Gringotts Services</h5>
            </div>
        </div>       
    </footer>
)

export default footer;