import React, { Component } from "react";
import classes from './homepage.module.css';

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

        <div class={classes["navigation"]}>
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
        </div>


        <header className={classes["header"]} style={{ height: '100vh' }}>
            <div className={classes["header__logo-box"]}>
                
            </div>

            <div className={classes["header__text-box"]}>
                <h1 className={classes["heading-primary"]}>
                    <span className={classes["heading-primary--main"]}>Gringotts</span>
                    <span className={classes["heading-primary--sub"]}>Strength through loyalty</span>
                </h1>

                <a href="" className={`${classes["btn"]} ${classes["btn--white"]} ${classes["btn--animated"]}`}>Lets Get Started</a>
            </div>
        </header>



        <main>
            <section className={classes["section-about"]}>
                <div className={`${classes["u-center-text"]} ${classes["u-margin-bottom-big"]}`}>
                    <h2 className={classes["heading-secondary"]}>
                        Exciting services for carefree people
                    </h2>
                </div>

                <div className={classes["row"]}>
                    <div className={classes["col-1-of-2"]}>
                        <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>You're going to fall in love with services we provided</h3>
                        <p className={classes["paragraph"]}>
                            Manage Secrets and Protect Sensitive Data using advanced services like AWS, GCP.
                        </p>

                        <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>No more breaking heads remembering multiple passwords</h3>
                        <p className={classes["paragraph"]}>
                            Secure, store and tightly control access to tokens, passwords, certificates, encryption keys for protecting secrets and other sensitive data using a UI, CLI, or HTTP API.
                        </p>

                        <a href="#" className={classes["btn-text"]}>Learn more &rarr;</a>
                    </div>
                    <div className={classes["col-1-of-2" ]}>
                        <div className={classes["composition"]}>

                            <img
                                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                                alt="Photo 1"
                                className={`${classes["composition__photo"]} ${classes["composition__photo--p1"]}`}
                                src={AwsLogo} />

                            <img
                                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                                alt="Photo 2"
                                className={`${classes["composition__photo"]} ${classes["composition__photo--p2"]}`}
                                src={DockerImg} />

                            <img
                                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                                alt="Photo 3"
                                className={`${classes["composition__photo"]} ${classes["composition__photo--p3"]}`}
                                src={GcpLogo} />
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes["section-features"]}>
                
                <div className={classes["row"]}>
                    <div className={classes["col-1-of-4"]}>
                        <div className={classes["feature-box"]}>
                            <i className={`${classes["feature-box__icon"]} ${classes["icon-basic-world"]}`}></i>
                            <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>Credential Manager</h3>
                            <p className={classes["feature-box__text"]}>
                            a. The application can be used to store credentials like username passwords,
                            keys, tokens or just any data.<br />
                            b. All the data is stored in layer 1 and properly encrypted.<br />
                                </p>
                        </div>
                    </div>

                    <div className={classes["col-1-of-4"]}>
                        <div className={classes["feature-box"]}>
                            <i className={`${classes["feature-box__icon"]} ${classes["icon-basic-compass"]}`}></i>
                            <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>Dynamic Credentials</h3>
                            <p className={classes["feature-box__text"]}>
                            a. Users do not have to ever remember their credentials for ​cloud services.< br/>
                            b. Every time the user needs to login, they can just contact the application and
                            generate a new username and password.
                            </p>
                        </div>
                    </div>

                    <div className={classes["col-1-of-4"]}>
                        <div className={classes["feature-box"]}>
                            <i className={`${classes["feature-box__icon"]} ${classes["icon-basic-map"]}`}></i>
                            <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>SSH-Keys</h3>
                            <p className={classes["feature-box__text"]}>
                            a. ssh-keys are used to authenticate and connect to remote servers/machines<br />
                            b. We can pre-configure the remote machines to accept any key signed by Gringotts.<br />
    
                            </p>
                        </div>
                    </div>

                    <div className={classes["col-1-of-4"]}>
                        <div className={classes["feature-box"]}>
                            <i className={`${classes["feature-box__icon"]} ${classes["icon-basic-heart"]}`}></i>
                            <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>GCP</h3>
                            <p className={classes["feature-box__text"]}>
                            a. Users can easily exchange data on insecure public channels with the
                            application encrypting the data for them.<br />
                            b. Makes use of GPG keys, user does not necessarily need to use
                            the application.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes["section-tours"]} id="section-tours">
                <div className={`${classes["u-center-text"]} ${classes["u-margin-bottom-big"]}`}>
                    <h2 className={classes["heading-secondary"]}>
                        Most popular services
                    </h2>
                </div>

                <div className={classes["row"]}>
                    <div className={classes["col-1-of-3"]}>
                    <div className={classes["card"]}>
                        <div className={`${classes["card__side"]} ${classes["card__side--front"]}`}>
                                <div className={`${classes["card__picture"]} ${classes["card__picture--1"]}`}>
                                    &nbsp;
                                </div>
                                <h4 className={classes["card__heading"]}>
                                    <span className={`${classes["card__heading-span"]} ${classes["card__heading-span--1"]}`}>GCP</span>
                                </h4>
                                <div className={classes["card__details"]}>
                                    <ul>
                                        <li>Secure</li>
                                        <li>Safe, Efficient</li>
                                        <li>setup authentication for these cloud providers via the application</li>
                                        
                                    </ul>
                                </div>
                        </div>
                        <div className={`${classes["card__side"]} ${classes["card__side--back"]} ${classes["card__side--back-1"]}`}>
                                <div className={classes["card__cta"]}>
                                    
                                    <a href="#popup" className={`${classes["btn"]} ${classes["btn--white"]}`}>Check now!</a>
                                </div>
                            </div>
                    </div>
                    </div>


                    <div className={classes["col-1-of-3"]}>
                        <div className={classes["card"]}>
                            <div className={`${classes["card__side"]} ${classes["card__side--front"]}`}>
                                <div className={`${classes["card__picture"]} ${classes["card__picture--2"]}`}>
                                    &nbsp;
                                </div>
                                <h4 className={classes["card__heading"]}>
                                    <span className={`${classes["card__heading-span"]} ${classes["card__heading-span--2"]}`}>AWS</span>
                                </h4>
                                <div className={classes["card__details"]}>
                                    <ul>
                                        <li>Cloud services to generate new username, password </li>
                                        <li>Up to 40 people</li>
                                        
                                        <li>Difficulty: medium</li>
                                    </ul>
                                </div>

                            </div>
                            <div className={`${classes["card__side"]} ${classes["card__side--back"]} ${classes["card__side--back-2"]}`}>
                                <div className={classes["card__cta"]}>
                                    
                                    <a href="#popup" className={`${classes["btn"]} ${classes["btn--white"]}`}>Check now!</a>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={classes["col-1-of-3"]}>
                        <div className={classes["card"]}>
                            <div className={`${classes["card__side"]} ${classes["card__side--front"]}`}>
                                <div className={`${classes["card__picture"]} ${classes["card__picture--3"]}`}>
                                    &nbsp;
                                </div>
                                <h4 className={classes["card__heading"]}>
                                    <span className={`${classes["card__heading-span"]} ${classes["card__heading-span--3"]}`}>Docker</span>
                                </h4>
                                <div className={classes["card__details"]}>
                                    <ul>
                                        <li>To download docker images in the deployment phase</li>
                                        <li>Up to 15 people</li>
                                    
                                        <li>Difficulty: hard</li>
                                    </ul>
                                </div>

                            </div>
                            <div className={`${classes["card__side"]} ${classes["card__side--back"]} ${classes["card__side--back-3"]}`}>
                                <div className={classes["card__cta"]}>
                                    
                                    <a href="#popup" className={`${classes["btn"]} ${classes["btn--white"]}`}>Check now!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </section>

            <section className={classes["section-stories"]}>
                <div className={classes["bg-video"]}>
                    <video className={classes["bg-video__content"]} autoPlay muted loop >
                        <source src={videoMP4} type="video/mp4" />
                        <source src={videoWeb} type="video/webm" />
                        Your browser is not supported!
                    </video>
                </div>

                <div className={`${classes["u-margin-bottom-big"]} ${classes["u-center-text"]}`}>
                    <h2 className={classes["heading-secondary"]}>
                        We make people genuinely happy
                    </h2>
                </div>

                <div className={classes["row"]}>
                    <div className={classes["story"]}>
                        <figure className={classes["story__shape"]}>
                            <img src={Nat8} alt="Person on a tour" className={classes["story__img"]} />
                            <figcaption className={classes["story__caption"]}>Mary Smith</figcaption>
                        </figure>
                        <div className={classes["story__text"]}>
                            <h3 className={`${classes["heading-tertiary"]} ${classes[" u-margin-bottom-small"]}`}>I had the best experience ever</h3>
                            <p>
                            I had to remember each and every password but now only have to take care of 
                                one password and VOLA!!! work is done.<br />
                                PHEW! Saves a lot of time searching for passwords where its stored.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={classes["row"]}>
                    <div className={classes["story"]}>
                        <figure className={classes["story__shape"]}>
                            <img src={Nat9} alt="Person on a tour" className={classes["story__img"]} />
                            <figcaption className={classes["story__caption"]}>Jack Wilson</figcaption>
                        </figure>
                        <div className={classes["story__text"]}>
                            <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>WOW! My life is completely different now</h3>
                            <p>
                                I had to remember each and every password but now only have to take care of 
                                one password and VOLA!!! work is done.<br />
                                PHEW! Saves a lot of time searching for passwords where its stored.
                            </p>
                        </div>
                    </div>
                </div>

                

                <div className={`${classes["u-center-text"]} ${classes["u-margin-top-huge"]}`}>
                    <a href="#" className={classes["btn-text"]}>Read all stories &rarr;</a>
                </div>
            </section>
        </main>

        <footer className={classes["footer"]}>
        
            <div className={classes["row"]}>
                <div className={classes["col-1-of-2"]}>
                    <div className={classes["footer__navigation"]}>
                        <ul className={classes["footer__list"]}>
                            <li className={classes["footer__item"]}><a href="#" className={classes["footer__link"]}>Company</a></li>
                            <li className={classes["footer__item"]}><a href="#" className={classes["footer__link"]}>Contact us</a></li>
                            <li className={classes["footer__item"]}><a href="#" className={classes["footer__link"]}>Carrers</a></li>
                            <li className={classes["footer__item"]}><a href="#" className={classes["footer__link"]}>Privacy policy</a></li>
                            <li className={classes["footer__item"]}><a href="#" className={classes["footer__link"]}>Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className={classes["col-1-of-2"]}>
                    <p className={classes["footer__copyright"]}>
                        Built by <a href="#" className={classes["footer__link"]}>Gringotts</a> 
                    </p>
                </div>
            </div>
        </footer>

    </React.Fragment>

    );
  }
}

export default Homepage;
