import React from "react";
import './DashboardCategoryCard.scss';
import EngineTable from "./EngineTable";
import TableCell from "./TableCell";
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

class DashboardCategoryCard extends React.Component {

    state = {
        activeEngine: null
    };

    engineClickedHandler = (e) => {
        this.setState({activeEngine: e})
    };

    getEngineHealth = (health) => {
        if (health === true) {
            return <span style={{color:"green", display: 'flex', alignItems: 'center'}}>
                <i className="material-icons" style={{fontWeight:"bold",paddingRight:"2px",fontSize:"140%"}}>check</i> Good
            </span>
        }
        else {
            return <span style={{color:"red"}} >
                <i className="material-icons" style={{fontWeight:"bold",paddingRight:"2px",fontSize:"140%"}}>clear</i> <span > {health}</span>
            </span>
        }
    }
    render() {
        let transformedEngineInfo = (eng) => {
            let { url } = this.props.match;

            if (url[url.length - 1] == '/'){
                url = url.substring(0,url.length-1)
            }
            const queryString = `${url}/${eng.type}/${eng.name}`
            return <table className="responsive-table dark">
                <tbody>
                <tr>
                    <th>Type:</th>
                    <td> {eng.type}</td>
                    <th> Created On:</th>
                    <td> {eng.createdOn}</td>
                </tr>

                <tr>
                    <th> Secrets Count:</th>
                    <td> {eng.credCount}</td>
                    <th > Health:</th>
                    <td colSpan="2"> {this.getEngineHealth(eng.health)}</td>
                </tr>

                <tr>
                    <span style={{color:"blue"}}>
                        <NavLink to={`${queryString}`} >
                            <TableCell content="Go to Engine"/>
                        </NavLink>
                    </span>
                    {/*<th colSpan="2" style={{color:"green",fontWeight:"bold",cursor:"pointer", textDecoration:"underline"}}> <a style={{textDecoration:"none"}} href="#">Go to Engine &gt;</a> </th>*/}
                </tr>
                </tbody>
            </table>
        };

        let rightCardContent = () => {
            if (this.state.activeEngine) {
                return <React.Fragment>

                    <span className="card-title cyan-text text-darken-4">
                        {this.state.activeEngine.name}
                    </span>
                    <div className="divider engine-info-divider"/>
                    {transformedEngineInfo(this.state.activeEngine)}

                </React.Fragment>

            } else {
                return <React.Fragment>
                    <span className="card-title cyan-text text-darken-4">
                        INFO
                    </span>
                    <div className="divider engine-info-divider"/>
                    <p className="grey-text text-darken-2 category-card__about">
                        {this.props.category.description}
                    </p>
                </React.Fragment>

            }
        }
        return (
            <div className="category-card">
                <div className="row">
                    <div className="col s12">
                        <div className="hoverable category-card">
                            <div className="row">
                                <div className="col s12 l6 card small category-card__inner">
                                    <div className="">
                                        <div className="card-content">
                                        <span className="card-title cyan-text text-darken-4">
                                            {this.props.title}
                                        </span>
                                            <div className="divider engine-info-divider"/>

                                            <EngineTable engines={this.props.engines}
                                                         category = {this.props.category}
                                                         engineClicked={this.engineClickedHandler}
                                                         activeEngine={this.state.activeEngine}
                                                         createEngine = {this.props.createEngine}

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 l6 card small category-card__info">
                                    <div className="">
                                        <div className="card-content">
                                            {rightCardContent()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
};

export default withRouter(DashboardCategoryCard);
