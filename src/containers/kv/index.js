import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import classes from './style.module.css';
import Tree from '../../components/TreeView/tree';
import CredCard from "../../components/KV/CredCard/CredCard";
import M from 'materialize-css';
import API from '../../utils/axios';

class Engine extends Component {
    state = {
        categories: [],
        revealCredModalInstance: null,
        createCredModalInstance: null,
        selectedCred: null,
        selectedCategoryForAdding: null
    };


    createCredential = category => {
        this.setState({ selectedCategoryForAdding: category });
        this.state.createCredModalInstance.open()
    };

    getUpdatedObj = (obj) => {
        const updatedCategory = obj.categories.map(category => {
            return {
                categoryName: category.name,
                creds: category.creds.map(cred => {
                    return {
                        provider: cred.providerName,
                        key: cred.credName || cred.key
                    }
                })
            }
        })
        return updatedCategory;
    }

    getEngineNameFromUrl = (url) => {
        const locationSplitBySlash = url.split('/');
        return locationSplitBySlash[locationSplitBySlash.length - 1];
    }

    async componentDidMount() {
        let modalOptions = {
            inDuration: 300,
            outDuration: 500
        };
        let revealCredModal = document.getElementById('credModal');
        revealCredModal = M.Modal.init(revealCredModal, modalOptions);
        this.setState({ revealCredModalInstance: revealCredModal });

        let createCredModal = document.getElementById('createCredModal');
        createCredModal = M.Modal.init(createCredModal, modalOptions);
        this.setState({ createCredModalInstance: createCredModal });

        const engineName = this.getEngineNameFromUrl(this.props.location.pathname);

        try {
            const res = await API.get(`/api/creds/${engineName}`, { headers: { "auth-token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGNmZDIxNDZkOGFjNzIwN2I5NTYzZDEiLCJpYXQiOjE1NzM5NDM1MzUsImV4cCI6MTU3Mzk0NzEzNX0.lDYh4vYbXHQ65_qRO42M-OBVGC4AOI0aaJRoFtu415w" } })
            const updateObj = this.getUpdatedObj(res.data.userInfo.engines[0])
            console.log(updateObj);
            this.setState({ categories: updateObj })
        } catch (e) {
            console.log(e);
        }

    }

    retrieveSecret = cred => {
        return "supersecret005"
    };

    secretRevealClicked = () => {
        const cred = this.state.selectedCred;
        this.setState({
            selectedCred: {
                provider: cred.provider,
                key: cred.key,
                "_id": cred["_id"],
                secret: this.retrieveSecret(cred)
            }
        })
    };

    secretCopyCLicked = () => {
        const cred = this.state.selectedCred;
        const secret = this.retrieveSecret(cred);
        const curComponent = this;
        navigator.clipboard.writeText(secret).then(function () {
            curComponent.setState({
                selectedCred: {
                    provider: cred.provider,
                    key: cred.key,
                    "_id": cred["_id"],
                    secret: "copied to clipboard"
                }
            })
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    };

    credClicked = cred => {
        this.setState({ selectedCred: { ...cred, secret: "*******" } });

        this.state.revealCredModalInstance.open();
    };

    addNewCredential = async () => {
        const newCredKey = document.getElementById('new-cred-key-input').value;
        const newCredValue = document.getElementById('new-cred-secret-input').value;
        const newProviderValue = document.getElementById('new-cred-provider-input').value;

        try {
            const res = await API.post(`/api/creds/secret/${this.getEngineNameFromUrl(this.props.location.pathname)}/kv/${this.state.selectedCategoryForAdding}`, {
                "credName": newCredKey,
                "credValue": newCredValue,
                "providerName": newProviderValue
            }, { headers: { "auth-token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGNmZDIxNDZkOGFjNzIwN2I5NTYzZDEiLCJpYXQiOjE1NzM5NDM1MzUsImV4cCI6MTU3Mzk0NzEzNX0.lDYh4vYbXHQ65_qRO42M-OBVGC4AOI0aaJRoFtu415w" } })
        
            console.log(res.data);
        } catch(e) {
            console.log(e);
        }


    };

    render() {
        this.props.location.pathname.split('/');

        let { selectedCred } = this.state;
        if (!selectedCred) {
            selectedCred = {
                key: "No Credential Selected",
                provider: "Not selected",
                "_id=": "none",
                secret: "*******"
            }
        }
        const { categories } = this.state;
        const credCards = categories.map(cat => {
            return <CredCard category={cat} key={cat.categoryName} credClicked={this.credClicked}
                createCred={this.createCredential} />
        });
        return (
            <React.Fragment>
                <Row>
                    <div className={classes.wrapper}>
                        <Col l={3}>
                            <aside className="hide-on-med-and-down">
                                <section className={classes.leftside}>
                                    <h1>
                                        <Tree />
                                    </h1>
                                </section>
                            </aside>
                        </Col>
                        <div className="col l9 s12">
                            <section className={classes.rightside}>
                                <div className={classes.headingArea}>
                                    <h1 className="cyan-text text-darken-4 title page-title">Credentials</h1>
                                    <button className={classes.categoryBtn}>Add Category</button>
                                </div>
                                <div className="row">
                                    {credCards.map((cc, index) => <div key={index} className="col s12 m6">{cc}</div>)}
                                </div>
                            </section>
                        </div>
                    </div>
                </Row>
                <div id="credModal" className="modal bottom-sheet secret-modal">
                    <div className="modal-content secret-model__content">
                        <div className="secret-modal__content_heading">
                            <span className="cred-cell__key">{selectedCred.key}</span>
                            <span className="cred-cell__provider">( {selectedCred.provider})</span>
                        </div>
                        <div className="secret-modal__content_secret-container">
                            <span>Secret : </span> <span
                                className="secret-modal__content_secret">{selectedCred.secret}</span>
                        </div>
                        <div>
                            <div className="btn waves-effect cyan darken-4" onClick={this.secretRevealClicked}><i
                                className="material-icons reveal-icon">remove_red_eye</i> &nbsp;&nbsp;Reveal
                            </div>
                            &nbsp;&nbsp;
                            <div className="btn waves-effect cyan darken-4" onClick={this.secretCopyCLicked}><i
                                className="material-icons reveal-icon">filter_none</i> &nbsp;&nbsp;Copy
                            </div>

                        </div>
                    </div>

                    <div className="divider cred-card-divider" />
                    <div className="modal-footer secret-modal__footer">`
                        <a href="#!" className="modal-close waves-effect waves-red btn red darken-4">Close</a>
                    </div>
                </div>

                <div id="createCredModal" className="modal bottom-sheet create-cred-modal">
                    <div className="modal-content create-cred-model__content">
                        <div className="create-cred-modal__content_heading">
                            <span className="cred-cell__key">Create new Credential</span>
                            <span className="cred-cell__provider">( {this.state.selectedCategoryForAdding})</span>
                        </div>
                        <div className="create-cred-modal__content_secret-container">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="new-cred-key-input" type="text" className="validate" />
                                    <label htmlFor="new-cred-key-input">Key</label>
                                </div>

                                <div className="input-field col s12">
                                    <input id="new-cred-provider-input" type="text" className="validate" />
                                    <label htmlFor="new-cred-provider-input">Provider</label>
                                </div>

                                <div className="input-field col s12">
                                    <input id="new-cred-secret-input" type="password" className="validate" />
                                    <label htmlFor="new-cred-secret-input">Secret</label>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="divider cred-card-divider" />
                    <div className="modal-footer create-cred-modal__footer">
                        <a href="#!" className="waves-effect waves-yellow btn yellow darken-4" onClick={() => M.updateTextFields()}>Reset</a>&nbsp;
                        <a href="#!" className="modal-close waves-effect waves-green btn green darken-4" onClick={this.addNewCredential}>Submit</a>&nbsp;
                        <a href="#!" className="modal-close waves-effect waves-red btn red darken-4">Cancel</a>&nbsp;
                    </div>
                </div>

            </React.Fragment>

        );
    }
}

export default Engine;