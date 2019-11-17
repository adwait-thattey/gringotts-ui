import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
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


    getCategories = () => {
        return [
            {
                name: "email",
                creds: [
                    {"provider": "GMail", "key": "x@gmail.com", "_id": "2432523"},
                    {"provider": "GMail", "key": "y@gmail.com", "_id": "24dw2523"},
                    {"provider": "Outlook", "key": "x@outlook.com", "_id": "243eqw523"},
                    {"provider": "Outlook", "key": "y@outlook.com", "_id": "2432ewaw"},
                    {"provider": "GMail", "key": "x@gmail.com", "_id": "24325aewad"}
                ]
            },
            {
                name: "entertainment",
                creds: [
                    {"provider": "Netflix", "key": "sampleuser001", "_id": "2432aed"},
                    {"provider": "DC Prime", "key": "sampleuser002", "_id": "24dw252ed"},
                    {"provider": "Netflix", "key": "sampleuser003", "_id": "243eqw52aa"},
                    {"provider": "Amazon Prime", "key": "sampleuser004", "_id": "2432aewfdae"},
                    {"provider": "HotStar", "key": "sampleuser005", "_id": "24325wededd"}
                ]
            },
            {
                name: "social",
                creds: [
                    {"provider": "Twitter", "key": "x@gmail.com", "_id": "24325dfs"},
                    {"provider": "DevRant", "key": "y@gmail.com", "_id": "24dw2asds"},
                    {"provider": "Twitter", "key": "x@outlook.com", "_id": "243eqwasd"},
                    {"provider": "Reddit", "key": "x@gmail.com", "_id": "24325aewasd"}
                ]
            },
            {
                name: "other",
                creds: [
                    {"provider": "acm.dl", "key": "x@gmail.com", "_id": "2432sdas"},
                    {"provider": "acm.dl", "key": "y@gmail.com", "_id": "24dw2asdas"},
                    {"provider": "acm.dl", "key": "x@outlook.com", "_id": "243easda"},
                    {"provider": "outlook", "key": "y@outlook.com", "_id": "2432ewaw"},
                    {"provider": "gmail", "key": "x@gmail.com", "_id": "24325aewad"}
                ]
            }
        ]
    }

    createCredential = category => {
        console.log("create new cred sequence called for ", category)
        console.log(this.state.createCredModalInstance)

        this.setState({selectedCategoryForAdding: category});
        this.state.createCredModalInstance.open()
    };

    getUpdatedObj = (obj) => {
        const updatedCategory = obj.categories.map(category => {
            return {
                categoryName: category.name,
                creds: category.creds.map(cred => {
                    return {
                        provider: cred.providerName,
                        key: cred.credName
                    }
                })
            }
        })
        return updatedCategory;
    }

    async componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        
        let modalOptions = {
            inDuration: 300,
            outDuration: 500
        };
        let revealCredModal = document.getElementById('credModal');
        revealCredModal = M.Modal.init(revealCredModal, modalOptions);
        this.setState({revealCredModalInstance: revealCredModal});

        let createCredModal = document.getElementById('createCredModal');
        createCredModal = M.Modal.init(createCredModal, modalOptions);
        this.setState({createCredModalInstance: createCredModal});

        const locationSplitBySlash = this.props.location.pathname.split('/');
        const engineName = locationSplitBySlash[locationSplitBySlash.length - 1];
    
        try {
            const res = await API.get(`/api/creds/${engineName}`, { headers: { "auth-token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGNmZDIxNDZkOGFjNzIwN2I5NTYzZDEiLCJpYXQiOjE1NzM5Mzc3NzAsImV4cCI6MTU3Mzk0MTM3MH0.8Goq8zVj42EvTVdK20nQK9riKbZx3qnGaZOkjLepZZU" } })
            const updateObj = this.getUpdatedObj(res.data.userInfo.engines[0])
            this.setState({ categories: updateObj })
        } catch(e) {
            console.log(e);
        }

    }

    retrieveSecret = cred => {
        // get secret
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
            console.log('Async: Copying to clipboard was successful!');
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
        console.log(this.state);
        console.log(this.state.revealCredModalInstance);

        this.setState({selectedCred: {...cred, secret: "*******"}});

        this.state.revealCredModalInstance.open();
        console.log("Cred clicked", this.state.selectedCred);

    };

    addNewCredential = () => {
      const newCredKey = document.getElementById('new-cred-key-input').value;
      const newCredValue = document.getElementById('new-cred-secret-input').value;

      console.log(newCredKey, newCredValue);
    };

    createCategory = () => {
        const newCatName = document.getElementById('new-category-input').value.toLowerCase();
        if (!newCatName){
            console.log("No name given");
            return
        }
        const currentCategories = this.state.categories;
        const existingCategories = currentCategories.filter(cat=>cat.name===newCatName);
        if (existingCategories.length > 0) {
            console.log("Category Already Exists")
            return
        }
        else {
            const newCat = {
                name: newCatName,
                creds: []
            };

            // call API to create category
            currentCategories.push(newCat);

            this.setState({categories:currentCategories});
        }
    }
    render() {
        let {selectedCred} = this.state;
        if (!selectedCred) {
            selectedCred = {
                key: "No Credential Selected",
                provider: "Not selected",
                "_id=": "none",
                secret: "*******"
            }
        }
        const {categories} = this.state;
        const credCards = categories.map(cat => {
            return <CredCard category={cat} key={cat.name} credClicked={this.credClicked}
                             createCred={this.createCredential}/>
        });
        return (
            <React.Fragment>
                <Row>
                    <div className={classes.wrapper}>
                        <Col l={3}>
                            <aside className="hide-on-med-and-down">
                                <section className={classes.leftside}>
                                    <h1>
                                        <Tree/>
                                    </h1>
                                </section>
                            </aside>
                        </Col>
                        <div className="col l9 s12">
                            <section className={classes.rightside}>
                                <h1 className="cyan-text text-darken-4 title page-title">Credentials</h1>
                                {/*<Row className={classes.customRow}>
                                    {categories && categories.map((category, index) => (
                                        <Col l={6} key={index}>
                                            <div className={classes.cardWrapper}>
                                                <Card
                                                    name={category.name}
                                                    credList={category.creds}
                                                />
                                            </div>
                                        </Col>
                                    ))}
                                </Row>*/}
                                <div className="row">
                                    {credCards.map(cc => <div className="col s12 m6">{cc}</div>)}
                                    <div className="col s12">
                                        <div className="row">
                                            <div className="col s12 m10">
                                              <div className="input-field">
                                                    <input id="new-category-input" type="text" className="validate" />
                                                    <label htmlFor="new-category-input">Create Category</label>
                                                </div>
                                                <div className="">
                                                    <a href="#!" onClick={this.createCategory} className="btn green darken-4">Create</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
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

                    <div className="divider cred-card-divider"/>
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
                                    <input id="new-cred-key-input" type="text" className="validate"/>
                                    <label htmlFor="new-cred-key-input">Key</label>
                                </div>

                                <div className="input-field col s12">
                                    <input id="new-cred-secret-input" type="password" className="validate" />
                                        <label htmlFor="new-cred-secret-input">Secret</label>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="divider cred-card-divider"/>
                    <div className="modal-footer create-cred-modal__footer">
                        <a href="#!" className="waves-effect waves-yellow btn yellow darken-4" onClick={ () => M.updateTextFields()}>Reset</a>&nbsp;
                        <a href="#!" className="modal-close waves-effect waves-green btn green darken-4" onClick={this.addNewCredential}>Submit</a>&nbsp;
                        <a href="#!" className="modal-close waves-effect waves-red btn red darken-4">Cancel</a>&nbsp;
                    </div>
                </div>

            </React.Fragment>

        );
    }
}

export default Engine;