import React from "react";

class CredTable extends React.Component {
    state = {}

    render() {

        const transformedCells = this.props.creds.map(cred => {
            return <td className="cred-cell" onClick={() => this.props.credClicked(cred)}>
                <a href="javascript:void(0)" className="cred-cell-link">
                    <span className="cred-cell__key">{cred.key}</span>
                    <span className="cred-cell__provider">( {cred.provider} )</span>
                </a>
            </td>
        });

        const credRows = transformedCells.map(cell => <tr>{cell}</tr>);
        return <table className="responsive-table striped category-table">
            <tbody>
            {credRows}
            </tbody>
        </table>
    }
}

export default CredTable;