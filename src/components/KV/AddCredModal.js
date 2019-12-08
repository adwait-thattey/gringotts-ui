import React from 'react';

const AddCredModal = (props) => {
    return (
        <React.Fragment>
            <div id="createCredModal" className="modal  create-cred-modal" style={{height: '70vh'}}>
                <div className="modal-content create-cred-model__content">
                    <div className="create-cred-modal__content_heading">
                        <span className="cred-cell__key">Create new Credential</span>
                        <span className="cred-cell__provider">( {props.category})</span>
                    </div><br/>
                    <div className="row">
                        <form className='col s12'> 
                            <div className='row modal-form-row'>
                                <div className="input-field col s12">
                                    <input id="new-cred-key-input" name='key' type="text" className="autocomplete" required />
                                    <label htmlFor="new-cred-key-input">Key</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="input-field col s12">
                                    <input id="new-cred-provider-input" name='provider' type="text" className="autocomplete" required />
                                    <label htmlFor="new-cred-provider-input">Provider</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="input-field col s12"> 
                                    <input id="new-cred-secret-input" name='secret' type="password" className="autocomplete" required />
                                    <label htmlFor="new-cred-secret-input">Secret</label>
                                </div>
                            </div>
                            <div className="modal-footer create-cred-modal__footer">
                                <a href="JavaScript:void(0)" className="modal-action modal-close waves-effect waves-green btn green darken-4" onClick={props.addCred}>Submit</a>&nbsp;
                                <a href="#!" className="modal-close waves-effect waves-red btn red darken-4">Cancel</a>&nbsp;
                            </div>
                        </form>
                    </div>
                </div> 
            </div>
        </React.Fragment>
    );
}


export default AddCredModal;