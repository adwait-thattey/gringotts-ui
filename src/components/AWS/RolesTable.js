import React from 'react';
import './RolesCard.scss';

class RolesTable extends React.Component {
    render(){
        const rolesRows = this.props.roles.map((role, index) => {
            return (
                <tr key={index}>
                    <td className="role-cell" onClick={() => this.props.roleClicked(role)}>
                        <a href="JavaScript:void(0)" className="role-cell-link">
                            <span className="role-cell__key">{role.roleName}</span> 
                        </a>
                    </td>
                </tr>
            );
        });

        return (
            <React.Fragment>
                <table className="responsive-table striped roles-table">
                    <tbody>
                        {rolesRows}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default RolesTable;