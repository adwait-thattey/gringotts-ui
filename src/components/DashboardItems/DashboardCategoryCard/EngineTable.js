import React from "react";
import './DashboardCategoryCard.scss';
import TableCell from "./TableCell";

class EngineTable extends React.Component{


    render() {
        let transformedEngines = this.props.engines.map(eng => (
                    <TableCell
                        object = {eng}
                        active={eng === this.props.activeEngine}
                        key={eng.id}
                        content = {eng.name}
                        click={this.props.engineClicked}
                    />
        ));

        let transformedEngineCells  = () => {
            let rows = [];
            const cells = transformedEngines;
            let ix=0;
            while (ix < cells.length) {
                if (ix+1 < cells.length) {
                    rows.push(  <tr>
                                    {cells[ix]}
                                    {cells[ix+1]}
                                </tr>
                    )
                }
                else {
                    rows.push(  <tr>
                            {cells[ix]}
                        </tr>
                    )
                }

                ix+=2;
            }
            return rows;
        }
        return <table className="responsive-table striped engine-table">
            <tbody>
            {transformedEngineCells()}
            <tr style={{color:"blue"}} onClick={()=> this.props.createEngine(this.props.category.name)}>
                    <TableCell
                        object={null}
                        content={"Create New Engine"}
                    />
            </tr>
            </tbody>
        </table>
    }
}

export default EngineTable;