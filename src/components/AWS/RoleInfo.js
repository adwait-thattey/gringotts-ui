import React from 'react';

class RoleInfo extends React.Component {
    state={}

    render(){
        const generatedCreds = this.props.role.generatedCreds.map((cred, index) => {
            return (
                <div key={index}>
                    <p>Access_key : " {cred.access_key} "</p><br/>
                    <p>Secret_key : " {cred.secret_key} "</p><br/>
                    <p>lease_duration :  {cred.lease_duration}  </p><br/>
                </div>
            )
        });

        return(
            <React.Fragment>
                <div className="roles-card">
                    <div className="row">
                        <div className="col s12 l12">
                            <div className="hoverable roles-card">
                                <div className="row">
                                    <div className="col s12 l12 card small roles-card__inner" style={{overflow: 'visible'}}>
                                        <div className="">
                                            <div className="card-content">
                                                <span className="card-title cyan-text text-darken-4">
                                                    <b>Credentials ( {this.props.role.name} )</b> 
                                                </span>
                                                <div className="divider cred-card-divider" />
                                                <div className="role-credentials">
                                                    {generatedCreds}
                                                </div>
                                                <div className="divider cred-card-divider" />
                                                <div>
                                                    <center>
                                                        <a href="JavaScript:void(0)" className="hoverable right btn cyan darken-4" onClick={this.props.genCreds}>
                                                            Generate Credentials
                                                        </a>
                                                    </center>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="" style={{ marginBottom: '70px'}}></div>
            </React.Fragment>
        );
    }
}


export default RoleInfo;