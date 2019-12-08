import React from 'react';
import './RolesCard.scss';

const RolesForm = (props) => {
    return ( 
        <React.Fragment>
            <p>Select Instance :</p>
            <div className="select">
                <div>
                    <label>
                        <input className="with-gap" value="S3" checked={props.formFields.selectedInstance === 'S3'} type="radio" onChange={props.select}/>
                        <span style={{ fontSize: '1.3rem',color: '#283593'}}>S3</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input className="with-gap" value="EC2" type="radio" checked={props.formFields.selectedInstance === 'EC2'} onChange={props.select} />
                        <span style={{ fontSize: '1.3rem',color: '#283593'}}>EC2</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input className="with-gap" value="RDS"checked={props.formFields.selectedInstance === 'RDS'} type="radio" onChange={props.select} />
                        <span style={{ fontSize: '1.3rem',color: '#283593'}}>RDS</span>
                    </label>
                </div>
                
                <div>
                    <label>
                        <input className="with-gap" value="Lambda" checked={props.formFields.selectedInstance === 'Lambda'} type="radio" onChange={props.select} required />
                        <span style={{ fontSize: '1.3rem',color: '#283593'}}>Lambda</span>
                    </label>
                </div>
            </div><br/>
            <div className='row'>
                <div className="input-field col s4" style={{paddingTop: '10px'}}>
                    <p>Role Name :</p>
                </div> 
                <div className="input-field col s8">
                    <input  id="first_name" type="text" value={props.formFields.roleName} onChange={props.roleName} required/>
                    <label htmlFor="first_name" style={{ fontSize: '1.3rem'}}>Role Name</label>
                </div>
            </div>
            <div>
                <center>
                    <a href="JavaScript:void(0)" className="hoverable right btn cyan darken-4" onClick={props.createRole}>Create A Role</a>
                </center>
            </div>
            
        </React.Fragment>
    )
}

export default RolesForm;