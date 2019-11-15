import React from 'react';
import './DashboardIcons.css';

const dashboardIcons = (props) => (

    <div className="flip-box" style={{ border: '0px solid black',}}>
        <div className="flip-box-inner">
            <div className="flip-box-front">
                <div className="row">
                    <div className="col s12">
                        <div>
                            <div className='flip-box-inner-image'>
                                <img src={props.image} style={{width: '130px', height: '130px'}} className="responsive-img"alt="Icons"/><br/>
                            </div><br/>
                            <h5 className="center"><b>{props.title}</b></h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flip-box-back">
                <h4><b><a href="/dashboard">{props.title}</a></b></h4>
                <h5>{props.desc}</h5>
            </div>
        </div>
    </div> 
)

export default dashboardIcons;