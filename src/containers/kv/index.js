import React, { Component } from 'react';
import CredCard from "../../components/KV/CredCard/CredCard";
import Layout from '../../hoc/Layout/Layout';
import AddCredModal from '../../components/KV/AddCredModal';
import RevealCredModal from '../../components/KV/RevealCredModal';
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

    getEngineNameFromUrl = (url) => {
        const locationSplitBySlash = url.split('/');
        return locationSplitBySlash[locationSplitBySlash.length - 1];
    }

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

    createCredential = category => {
        this.setState({ selectedCategoryForAdding: category });
        this.state.createCredModalInstance.open()
    };

    credClickedHandler = (cred, category) => {
        this.setState({ selectedCred: { ...cred, secret: "*******" }, selectedCategoryForAdding: category });
        this.state.revealCredModalInstance.open();
    };

    addNewCredential = async () => {

        const newCredKey = document.getElementById('new-cred-key-input').value;
        const newCredValue = document.getElementById('new-cred-secret-input').value;
        const newProviderValue = document.getElementById('new-cred-provider-input').value;

        try {
            const allCategories = this.state.categories;
            const reqCat = this.state.categories.filter(cat => cat.name === this.state.selectedCategoryForAdding)[0];
            const reqCatIx = allCategories.indexOf(reqCat)
            allCategories[reqCatIx].creds.push({ "provider": newProviderValue, "key": newCredKey, "_id": "sfdweadf" })
            this.setState({ categories: allCategories });
            console.log(allCategories);


            const res = await API.post(`/api/creds/secret/${this.getEngineNameFromUrl(this.props.location.pathname)}/kv/${this.state.selectedCategoryForAdding}`, {
                "credName": newCredKey,
                "credValue": newCredValue,
                "providerName": newProviderValue
            }, { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } })

            console.log(res.data);

            
        } catch (e) {
            console.log(e);
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
            return (
                <div className="col s12 m6" key={cat.name}>
                    <CredCard category={cat} 
                              credClicked={this.credClickedHandler}
                              createCred={this.createCredential} />
                </div>
            )}
        );
        return (
            <Layout>
                <SideLayout>
                    <h1 className="cyan-text text-darken-4 title page-title">Credentials</h1>
                    <div className="row">
                        {credCards}
                        <div className="col s12">
                            <div className="row">
                                <div className="col s12 m10">
                                    <div className="input-field">
                                        <input id="new-category-input" type="text" className="validate" required />
                                        <label htmlFor="new-category-input">Create Category</label>
                                    </div>
                                    <div className="">
                                        <a href="JavaScript:void(0)" onClick={this.createCategory} className="btn green darken-4">Create</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SideLayout>
                <AddCredModal 
                    category={this.state.selectedCategoryForAdding} 
                    addCred={this.addNewCredential}
                />
                <RevealCredModal 
                    Key={selectedCred.key}
                    provider={selectedCred.provider}
                    secret={selectedCred.secret}
                    revealClick={this.secretRevealClicked}
                    copyClick={this.secretCopyCLicked} 
                />

                
            </Layout>

        );
    }
}

export default Engine;