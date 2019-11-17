import React from "react";

class CredTable extends React.Component {
    state = {}

    render() {

        const transformedCells = this.props.creds.map((cred, index) => {
            return <td key={index} className="cred-cell" onClick={() => this.props.credClicked(cred)}>
                <a href="javascript:void(0)" className="cred-cell-link">
                    <span className="cred-cell__key">{cred.key}</span>
                    <span className="cred-cell__provider">( {cred.provider} )</span>
                </a>
            </td>
        });

        const credRows = transformedCells.map((cell, index) => <tr key={index}>{cell}</tr>);
        return <table className="responsive-table striped category-table">
            <tbody>
            <td className="cred-cell cred-cell__create" >
                <a href="javascript:void(0)" className="" onClick={() => this.props.createCred(this.props.cat)}>
                    <span className="cred-cell__key">Add Credential &nbsp;&nbsp;&gt;</span>
                </a>
            </td>
            {credRows}
            </tbody>
        </table>
    }
}

export default CredTable;