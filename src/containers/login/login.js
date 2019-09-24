import React, {Component} from 'react';
import M from 'materialize-css'
import './login.scss'
import vault_handle from '../../images/components/login/vault_handle.png';


class Login extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    state = {

    };

    render() {
        return (
            <section>
                <div className={"section-login-page"}>


                    <div className="section-login-page-part__signup">
                        <div  className="section-login-page-part__heading section-login-page-part__heading--signup">
                            <h2>Signup</h2>
                        </div>
                    </div>


                    <div className="section-login-page-part__login">
                        <div  className="section-login-page-part__heading section-login-page-part__heading--login">
                            <h2>Login</h2>
                        </div>
                    </div>

                    <div className="section-login-page-overlay section-login-page-overlay--left">

                    </div>
                    <div className="section-login-page-overlay section-login-page-overlay--right">

                    </div>

                    <div className="section-login-page-rotating-vault">
                        <img src={vault_handle} className="section-login-page-rotating-vault__vault-handle" alt="Vault" />
                    </div>
                </div>
            </section>
        )
    }
}

export default Login;