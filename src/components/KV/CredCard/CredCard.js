import React from "react";
import './credcard.scss'
import CredTable from "../CredTable/CredTable";
class CredCard extends React.Component {
    render() {

        return <div className="cred-card">
            <div className="row">
                <div className="col s12">
                    <div className="card small">
                        <span className="card-title cyan-text text-darken-4">
                            <span className="cred-card__title title">
                                {this.props.category.name.toUpperCase()} <span className="cred-card__title_icon">&gt;</span>
                            </span>
                        </span>
                        <div className="divider cred-card-divider" />
                        <div className="card-content ">
                            <div className="cred-card__content">
                                <CredTable 
                                    creds={this.props.category.creds} 
                                    cat={this.props.category.name} 
                                    credClicked={this.props.credClicked} 
                                    createCred={this.props.createCred} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default CredCard;