import React from 'react';

const ConfigModal = (props) => {
    return (
        <React.Fragment>
            <div id="configModal" className="modal  create-cred-modal" style={{height: '70vh', width: '40vw', overflow: 'visible'}}>
                <div className="modal-content create-cred-model__content">
                    <div className="create-cred-modal__content_heading">
                        <span className="cred-cell__key">Configure AWS Engine</span>
                        <span className="cred-cell__provider">( {props.engName})</span>
                    </div><br/>
                    <div className="row">
                        <form className='col s12'  > 
                            <div className='row modal-form-row'>
                                <div className="input-field col s12">
                                    <input id="access-key-input" name='accessKey' type="text" className="autocomplete" required />
                                    <label htmlFor="new-cred-key-input">Access Key</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="input-field col s12">
                                    <input id="secret-key-input" name='secretKey' type="text" className="autocomplete" required />
                                    <label htmlFor="new-cred-provider-input">Secret Key</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="input-field col s12">
                                    <input id="account-name-input" name="accountName" type="text" className="autocomplete" required />
                                    <label htmlFor="new-cred-secret-input">Account Name</label>
                                </div>
                            </div>
                            <div className="modal-footer create-cred-modal__footer">
                                <a href="JavaScript:void(0)" className="modal-action left modal-close waves-effect waves-green btn green darken-4" onClick={props.configure}>Configure</a>&nbsp;
                                <a href="#!" className="modal-close right waves-effect waves-red btn red darken-4">Cancel</a>&nbsp;
                            </div>
                        </form>
                    </div>
                </div>
                {/* <div className="divider cred-card-divider" /> */}
                
            </div>
        </React.Fragment>
    );
}

export default ConfigModal;