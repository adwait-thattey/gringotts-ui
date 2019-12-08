import React, { Component } from "react";
import classes from './homepage.module.css';
import './sass/main.scss'
import AwsLogo from '../../images/components/homepage/aws-logo.png';
import GcpLogo from '../../images/components/homepage/gcp-logo.jpg';
import DockerImg from '../../images/components/homepage/docker-logo.png';
// import BashImg from '../../images/components/homepage/bash.jpg';
// import VaultImg from '../../images/components/homepage/vault1.jpg';
// import Background from '../../images/components/homepage/back2.jpg';
import Nat8 from '../../images/components/homepage/nat-8.jpg';
import Nat9 from '../../images/components/homepage/nat-9.jpg';
import videoMP4 from '../../images/components/homepage/video.mp4';
import videoWeb from '../../images/components/homepage/video.webm';


class Homepage extends Component {

  render() {
    return (

        <React.Fragment>

        {/*<div class={classes["navigation"]}>
            <input type="checkbox" className={classes["navigation__checkbox"]} id="navi-toggle" />

            <label for="navi-toggle" className={classes["navigation__button"]}>
                <span className={classes["navigation__icon"]}>&nbsp;</span>
            </label>

            <div className={classes["navigation__background"]}>&nbsp;</div>

            <nav className={classes["navigation__nav"]}>
                <ul className={classes["navigation__list"]}>
                    <li className={classes["navigation__item"]}><a href="#" class={classes["navigation__link"]}><span>01</span>About Gringotts</a></li><br />
                    <li className={classes["navigation__item"]}><a href="#" class={classes["navigation__link"]}><span>02</span>Your benfits</a></li><br />
                    <li className={classes["navigation__item"]}><a href="#" class={classes["navigation__link"]}><span>03</span>Popular services</a></li>
                    
                </ul>
            </nav>
        </div>*/}


            <header className="header-nat">
                {/*<div className="header-nat__logo-box">
                    <img src"https://adwait-thattey.github.io/images/projects/gringotts/homepage/logo-white.png" alt="Logo" className="header-nat__logo"/>
                </div>*/}

                <div className="header-nat__text-box">
                    <h1 className="heading-primary">
                        <span className="heading-primary--main">Gringotts</span>
                        <span className="heading-primary--sub">Strength through loyalty</span>
                    </h1>

                    <a href="/dashboard" className="btn-nat btn-nat--white btn-nat--animated"
                    >Discover our tools</a
                    >
                </div>


            </header>


            <main_nat>

                <section className="section-about">
                    <div className="u-center-text u-margin-bottom-big">
                        <h2 className="heading-secondary">
                            Exciting services provided to developers
                        </h2>
                    </div>

                    <div className="row-nat">
                        <div className="col-1-of-2">
                            <h3 className="heading-tertiary u-margin-bottom-small">
                                Secure Storage backend using one or multiple instances of ​
                                Hashicorp Vault
                            </h3>
                            <p className="paragraph">
                                It contains an instance of ​ Hashicorp Vault​ interfacing with a
                                PostgreSQL instance. Vault is an application in itself which will
                                use PostgreSQL for persistent storage.The vault provides a set of
                                HTTP APIs which will be consumed by the layer 2 Node server.
                            </p>

                            <p className="paragraph"></p>

                            <a href="#" className="btn-nat-text">Learn more &rarr;</a>
                        </div>
                        <div className="col-1-of-2">
                            <div className="composition-nat">
                                <img
                                    src="https://adwait-thattey.github.io/images/projects/gringotts/homepage/aws-logo.png"
                                    alt="Photo 1"
                                    className="composition-nat__photo composition-nat__photo--p1"
                                />
                                <img
                                    src="https://adwait-thattey.github.io/images/projects/gringotts/homepage/gcp-logo.jpg"
                                    alt="Photo 2"
                                    className="composition-nat__photo composition-nat__photo--p2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row-nat">
                        <div className="col-1-of-2">
                            <h3 className="heading-tertiary u-margin-bottom-small">
                                Server Layer using one or multiple instances of node.js server
                            </h3>
                            <p className="paragraph">
                                The primary job of server is authentication, maintaining list of
                                users and privileges, map where each data item is stored in the
                                vault, maintain consistency in transactions, coordinate with
                                multiple vault instances etc. The secret data like passwords and
                                keys are not stored in server. It is encrypted and stored in the
                                vaults. Server provides mapping to this data. The server uses
                                mongoDB NoSQL database. Redis is used for caching.
                            </p>

                            <p className="paragraph"></p>

                            <a href="#" className="btn-nat-text">Learn more &rarr;</a>
                        </div>

                        <div className="col-1-of-2">
                            <div className="composition-nat">
                                <img
                                    src="https://adwait-thattey.github.io/images/projects/gringotts/homepage/terminal.png"
                                    alt="Photo 1"
                                    className="composition-nat__photo composition-nat__photo--p1"
                                />
                                <img
                                    src="https://adwait-thattey.github.io/images/projects/gringotts/homepage/bash.jpg"
                                    alt="Photo 2"
                                    className="composition-nat__photo composition-nat__photo--p2"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-features">
                    <div className="row-nat">
                        <div className="col-1-of-4">
                            <div className="feature-box">
                                <i className="feature-box__icon icon-basic-world" />
                                <h3 className="heading-tertiary u-margin-bottom-small">
                                    credential manager
                                </h3>
                                <p className="feature-box__text">
                                    a. The application can be used to store credentials like
                                    username passwords, keys, tokens or just any data.<br/>
                                    b. All the data is stored in layer 1 and properly encrypted.<br/>
                                    c. All the credentials will be grouped into different categories
                                    and customized services for specific applications can be
                                    provided.
                                </p>
                            </div>
                        </div>

                        <div className="col-1-of-4">
                            <div className="feature-box">
                                <i className="feature-box__icon icon-basic-cloud"></i>
                                <h3 className="heading-tertiary u-margin-bottom-small">
                                    Authentication Manager for external cloud services​ :
                                </h3>
                                <p className="feature-box__text">
                                    a. No need toremember credentials for ​cloud services.<br/>
                                    b. Every time you need to login, contact the application and
                                    generate a new username and password.<br/>
                                    c. New account is in restricted access, to remove misuse the
                                    credentials.<br/>
                                </p>
                            </div>
                        </div>

                        <div className="col-1-of-4">
                            <div className="feature-box">
                                <i className="feature-box__icon icon-basic-map"></i>
                                <h3 className="heading-tertiary u-margin-bottom-small">
                                    Safe exchange of data using GPG keys
                                </h3>
                                <p className="feature-box__text">
                                    a. Users can easily exchange data on insecure public channels
                                    with the application encrypting the data for them.<br/>
                                    b. Makes use of GPG keys. So the target user does not
                                    necessarily need to use the application.<br/>
                                    c. Sends encrypted data to the application after cerficate
                                    verification.
                                </p>
                            </div>
                        </div>

                        <div className="col-1-of-4">
                            <div className="feature-box">
                                <i className="feature-box__icon icon-basic-key"></i>
                                <h3 className="heading-tertiary u-margin-bottom-small">
                                    generate ssh-keys on the fly
                                </h3>
                                <p className="feature-box__text">
                                    a.SSH-keys are used to authenticate and connect to remote
                                    servers/machines<br/>
                                    b.Pre-configuration the remote machines to accept any key signed
                                    by Gringotts.<br/>
                                    c. Every time for connection a new key is generated by the
                                    application to authenticate the machines.<br/>
                                    d. The generated key expires after some time.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-tours" id="section-tours">
                    <div className="u-center-text u-margin-bottom-big">
                        <h2 className="heading-secondary">
                            Most popular tools
                        </h2>
                    </div>

                    <div className="row-nat">
                        <div className="col-1-of-3">
                            <div className="card-nat">
                                <div className="card-nat__side card-nat__side--front">
                                    <div className="card-nat__picture card-nat__picture--1">
                                        &nbsp;
                                    </div>
                                    <h4 className="card-nat__heading">
                  <span className="card-nat__heading-span card-nat__heading-span--1"
                  >Amazon web services</span
                  >
                                    </h4>
                                    <div className="card-nat__details">
                                        <ul>
                                            <li>Secure</li>
                                            <li>Compliant</li>
                                            <li>Hybrid</li>
                                            <li>Scalable</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-nat__side card-nat__side--back card-nat__side--back-1">
                                    <div className="card-nat__cta">
                                        <a
                                            href="https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=header_signup&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start"
                                            className="btn-nat btn-nat--white"
                                        >Register now!</a
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-1-of-3">
                            <div className="card-nat">
                                <div className="card-nat__side card-nat__side--front">
                                    <div className="card-nat__picture card-nat__picture--2">
                                        &nbsp;
                                    </div>
                                    <h4 className="card-nat__heading">
                  <span className="card-nat__heading-span card-nat__heading-span--2"
                  >Google cloud platform</span
                  >
                                    </h4>
                                    <div className="card-nat__details">
                                        <ul>
                                            <li>Serverless,Just code</li>
                                            <li>Powerful data & analytics</li>
                                            <li>Future - proof infrastructure</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-nat__side card-nat__side--back card-nat__side--back-2">
                                    <div className="card-nat__cta">
                                        <a
                                            href="https://cloud.google.com/gcp/?utm_source=google&utm_medium=cpc&utm_campaign=japac-IN-all-en-dr-bkwsrmkt-all-super-trial-e-dr-1003987&utm_content=text-ad-none-none-DEV_c-CRE_351947518698-ADGP_Hybrid%20%7C%20AW%20SEM%20%7C%20BKWS%20~%20T1%20%7C%20EXA%20%7C%20General%20%7C%201:1%20%7C%20IN%20%7C%20en%20%7C%20google%20cloud%20platform-KWID_43700037527390284-kwd-26415313501&userloc_1007740&utm_term=KW_google%20cloud%20platform&gclid=EAIaIQobChMI3JrcnYXp5AIVWD5gCh31vQPXEAAYASAAEgLHpPD_BwE"
                                            className="btn-nat btn-nat--white"
                                        >Register now!</a
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-1-of-3">
                            <div className="card-nat">
                                <div className="card-nat__side card-nat__side--front">
                                    <div className="card-nat__picture card-nat__picture--3">
                                        &nbsp;
                                    </div>
                                    <h4 className="card-nat__heading">
                  <span className="card-nat__heading-span card-nat__heading-span--3"
                  >Docker hub</span
                  >
                                    </h4>
                                    <div className="card-nat__details">
                                        <ul>
                                            <li>Faster configuration</li>
                                            <li>Application isolation</li>
                                            <li>Build and ship any application anywhere</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-nat__side card-nat__side--back card-nat__side--back-3">
                                    <div className="card-nat__cta">
                                        <a href="https://hub.docker.com/" className="btn-nat btn-nat--white"
                                        >Register now!</a
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="u-center-text u-margin-top-huge">
                        <a href="/dashboard" className="btn-nat btn-nat--green">Discover all tools</a>
                    </div>
                </section>

                <section className="section-stories">
                    <div className="bg-video">
                        <video className="bg-video__content" autoPlay muted loop>
                            <source src="https://adwait-thattey.github.io/images/projects/gringotts/homepage/video.mp4" type="video/mp4"/>
                            <source src="https://adwait-thattey.github.io/images/projects/gringotts/homepage/video.webm" type="video/webm"/>
                            Your browser is not supported!
                        </video>
                    </div>

                    <div className="u-center-text u-margin-bottom-big">
                        <h2 className="heading-secondary">
                            We make people genuinely happy
                        </h2>
                    </div>

                    <div className="row-nat">
                        <div className="story-nat">
                            <figure className="story-nat__shape">
                                <img
                                    src="https://adwait-thattey.github.io/images/projects/gringotts/homepage/profile.png"
                                    alt="Person on a tour"
                                    className="story-nat__img"
                                />
                                <figcaption className="story-nat__caption">Mary Smith</figcaption>
                            </figure>
                            <div className="story-nat__text">
                                <h3 className="heading-tertiary u-margin-bottom-small">
                                    I had the best experience ever!
                                </h3>
                                <p>
                                    I had to remember each and every password but now only have to
                                    take care of one password and VOLA!!! work is done.<br/>
                                    PHEW! Saves a lot of time searching for passwords where its
                                    stored.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row-nat">
                        <div className="story-nat">
                            <figure className="story-nat__shape">
                                <img
                                    src="https://adwait-thattey.github.io/images/projects/gringotts/homepage/nat-9.jpg"
                                    alt="Person on a tour"
                                    className="story-nat__img"
                                />
                                <figcaption className="story-nat__caption">Jack Wilson</figcaption>
                            </figure>
                            <div className="story-nat__text">
                                <h3 className="heading-tertiary u-margin-bottom-small">
                                    Have no worries about security
                                </h3>
                                <p>
                                    I had to remember each and every password but now only have to
                                    take care of one password and VOLA!!! work is done.<br/>
                                    PHEW! Saves a lot of time searching for passwords where its
                                    stored.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="u-center-text u-margin-top-huge">
                        <a href="#" className="btn-nat-text">Read all stories &rarr;</a>
                    </div>
                </section>
            </main_nat>

            <footer className="footer-nat">
                <div className="footer-nat__logo-box">
                    <img src="https://adwait-thattey.github.io/images/projects/gringotts/homepage/logo-white.png" alt="Full logo" className="footer-nat__logo"/>
                </div>
                <div className="row-nat">
                    <div className="col-1-of-2">
                        <div className="footer-nat__navigation">
                            <ul className="footer-nat__list">
                                <li className="footer-nat__item">
                                    <a href="#" className="footer-nat__link">Company</a>
                                </li>
                                <li className="footer-nat__item">
                                    <a href="#" className="footer-nat__link">Contact us</a>
                                </li>
                                <li className="footer-nat__item">
                                    <a href="#" className="footer-nat__link">Carrers</a>
                                </li>
                                <li className="footer-nat__item">
                                    <a href="#" className="footer-nat__link">Privacy policy</a>
                                </li>
                                <li className="footer__item">
                                    <a href="#" className="footer__link">Terms</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

    </React.Fragment>

    );
  }
}

export default Homepage;
