import React from 'react';

const RevelCredModal = (props) => { 
    return (
        <React.Fragment>
            <div id="credModal" className="modal  secret-modal" style={{height: '50vh'}}>
                <div className="modal-content secret-model__content">
                    <div className="secret-modal__content_heading">
                        <span className="cred-cell__key">{props.Key}</span>
                        <span className="cred-cell__provider">( {props.provider})</span>
                    </div>
                    <div className="secret-modal__content_secret-container">
                        <span>Secret : </span> <span
                            className="secret-modal__content_secret">{props.secret}</span>
                    </div>
                    <div>
                        <div className="btn waves-effect cyan darken-4" onClick={props.revealClicked}><i
                            className="material-icons reveal-icon">remove_red_eye</i> &nbsp;&nbsp;Reveal
                        </div>
                        &nbsp;&nbsp;
                        <div className="btn waves-effect cyan darken-4" onClick={props.copyClicked}><i
                            className="material-icons reveal-icon">filter_none</i> &nbsp;&nbsp;Copy
                        </div>
                    </div>
                </div>

                <div className="divider cred-card-divider" />
                <div className="modal-footer secret-modal__footer">`
                    <a href="#!" className="modal-close waves-effect waves-red btn red darken-4">Close</a>
                </div>
            </div>
        </React.Fragment>
    );
}

export default RevelCredModal;