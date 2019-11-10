import React from 'react';
import './DashboardBlocks.css';

const dashboardBlock = (props) => {
    return(
        <div className="blocks">
            <div className='row'>
                <div className='col l12'> 
                    <div className="col s12 m6 l7">
                        <h2>{props.title}</h2>
                        <h4>{props.desc}</h4>
                        <div className='buttonDiv'>
                            <a className="btn-large" href={props.url}>Get Started</a>
                        </div>
                    </div>
                    <div className='col l2'></div>
                    <div className="col s12 m6 l3">
                        <div className="imageDiv">
                            <img alt="img" src={props.image} />
                        </div>
                    </div>    
                </div>
            </div> 
        </div>
    );
}

export default dashboardBlock;