import React from 'react';
import RolesTable from './RolesTable';
import RolesForm from './RolesForm';
import './RolesCard.scss';

class RolesCard extends React.Component {
    render(){
        return (
            <div className="roles-card">
                <div className="row">
                    <div className="col s12 l12">
                        <div className="hoverable roles-card">
                            <div className="row">
                                <div className="col s12 l6 card small roles-card__inner">
                                    <div className="">
                                        <div className="card-content">
                                            <span className="card-title cyan-text text-darken-4">
                                                <b>Roles</b> 
                                            </span>
                                            <div className="divider cred-card-divider" />
                                            <RolesTable 
                                                roles={this.props.roles}
                                                roleClicked={this.props.roleClicked}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 l6 card small roles-card__inner" style={{overflow: 'visible'}}>
                                    <div className="">
                                        <div className="card-content">
                                            <span className="card-title cyan-text text-darken-4">
                                                <b>Create a Role</b> 
                                            </span>
                                            <div className="divider cred-card-divider" />
                                            <RolesForm 
                                                select={this.props.select} 
                                                roleName={this.props.roleName}
                                                createRole={this.props.create}
                                                formFields={this.props.formFields}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RolesCard;