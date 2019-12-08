import React from 'react';

const ConfigMessage = (props) => { 
    return (
        <React.Fragment>
            <h1 className="cyan-text text-darken-4 title page-title">Dynamic Credentials</h1>
            <div className="row" > 
                <div className="col s12 m10" id='config-message'>
                    <h4 className="red-text text-darken-4 title page-title">
                        You haven't configured your AWS Secrets Engine yet.
                    </h4>
                </div>
            </div>
            <div className="row"> 
                <div className="col s12 m10">
                    <h4 className="cyan-text text-darken-4 title page-title">
                        You must configure it to authenticate and communicate with AWS.<br/><br/>
                        This requires privileged account credentials.
                    </h4>
                </div>
            </div>

            <div className="row" id="aws-config-form">
                <div className="col s12 m10">
                    <h3 className="cyan-text text-darken-4 title page-title">Configure the AWS Secrets Engine</h3>
                    <div className="divider cred-card-divider" /><br/>
                    <div className="">
                        <a href="JavaScript:void(0)" onClick={props.configure} className="btn green darken-4">Configure Now</a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ConfigMessage;