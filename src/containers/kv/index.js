import React, { Component } from 'react';
import CredCard from "../../components/KV/CredCard/CredCard";
import M from 'materialize-css';
import API from '../../utils/axios';
import SideLayout from '../../hoc/sidelayout/sidelayout';

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
                name: category.name,
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
            const res = await API.get(`/api/creds/${engineName}`, { headers: { "auth-token": `Bearer ${localStorage.getItem('AUTH_TOKEN')}` } });
            const updateObj = this.getUpdatedObj(res.data.userInfo.engines[0])
            this.setState({ categories: updateObj })
        } catch (e) {
            console.log(e);
        }

    }

    retrieveSecret = async cred => {
        const credName = cred.key || cred.credName;
        const engineName = this.getEngineNameFromUrl(this.props.location.pathname);
        const categoryName = this.state.selectedCategoryForAdding;

        try {
            const res = await API.get(`api/creds/secret/${engineName}/${categoryName}/${credName}`, {
                headers: { "auth-token": `Bearer ${localStorage.getItem('AUTH_TOKEN')}` }
            })
            return res.data.data;
        } catch(e) {
            console.log(e.response);
        }

    };

    secretRevealClicked = async () => {
        const cred = this.state.selectedCred;
        this.setState({
            selectedCred: {
                provider: cred.provider,
                key: cred.key,
                "_id": cred["_id"],
                secret: await this.retrieveSecret(cred)
            }
        })
    };

    secretCopyCLicked = async () => {
        const cred = this.state.selectedCred;
        const secret = await this.retrieveSecret(cred);
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

    credClicked = (cred, category) => {
        this.setState({ selectedCred: { ...cred, secret: "*******" }, selectedCategoryForAdding: category });
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
            }, { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } })

            console.log(res.data);

            const allCategories = this.state.categories;
            const reqCat = this.state.categories.filter(cat => cat.name === this.state.selectedCategoryForAdding)[0];
            const reqCatIx = allCategories.findIndex(reqCat)
            allCategories[reqCatIx].creds.push({ "provider": newProviderValue, "key": newCredKey, "_id": "sfdweadf" })

            this.setState({ categories: allCategories })
        } catch (e) {
            console.log(e);
        }
    };

    createCategory = () => {
        const newCatName = document.getElementById('new-category-input').value.toLowerCase();
        if (!newCatName) {
            console.log("No name given");
            return
        }
        const currentCategories = this.state.categories;
        const existingCategories = currentCategories.filter(cat => cat.name === newCatName);
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

            this.setState({ categories: currentCategories });
        }
    }
    render() {
        this.props.location.pathname.split('/');

        let { selectedCred } = this.state;
        selectedCred && console.log(selectedCred.secret);
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
            return <CredCard category={cat} key={cat.name} credClicked={this.credClicked}
                createCred={this.createCredential} />
        });
        return (
            <React.Fragment>
                <SideLayout>
                    <h1 className="cyan-text text-darken-4 title page-title">Credentials</h1>
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
                </SideLayout>

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
                                    <input autoComplete={false} id="new-cred-key-input" type="text" className="validate" />
                                    <label htmlFor="new-cred-key-input">Key</label>
                                </div>

                                <div className="input-field col s12">
                                    <input autoComplete={false} id="new-cred-provider-input" type="text" className="validate" />
                                    <label htmlFor="new-cred-provider-input">Provider</label>
                                </div>

                                <div className="input-field col s12">
                                    <input autoComplete={false} id="new-cred-secret-input" type="password" className="validate" />
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