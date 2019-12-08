import React from "react";

class CredTable extends React.Component {
    state = {}

    render() {

        const credRows = this.props.creds.map((cred, index) => {
            return (
                <tr key={index}>
                    <td className="cred-cell" onClick={() => this.props.credClicked(cred, this.props.cat)}>
                        <a href="JavaScript:void(0)" className="cred-cell-link">
                            <span className="cred-cell__key">{cred.key}</span>
                            <span className="cred-cell__provider">( {cred.provider} )</span>
                        </a>
                    </td>
                </tr>
            );
        });

        // const credRows = transformedCells.map((cell, index) => <tr key={index}>{cell}</tr>);
        return (
            <table className="responsive-table striped category-table">
                <tbody>
                    {credRows}
                    <tr>
                        <td className="cred-cell cred-cell__create" onClick={() => this.props.createCred(this.props.cat)} >
                            <a href="JavaScript:void(0)" className="" >
                                <span className="cred-cell__key">Add Credential &nbsp;&nbsp;&gt;</span>
                            </a>
                        </td>
                    </tr>                    
                </tbody>
            </table>
        )
    }
}

export default CredTable;