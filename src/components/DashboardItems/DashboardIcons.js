import React from 'react';
import './DashboardIcons.css';

const dashboardIcons = (props) => (

    <div class="flip-box" style={{ border: '0px solid black',}}>
        <div class="flip-box-inner">
            <div class="flip-box-front">
                <div className="row">
                <div className="col s12">
                    <div>
                        <div className='flip-box-inner-image'>
                            <img src={props.image} style={{width: '130px', height: '130px'}} clasName="responsive-img"alt="Icons"/><br/>
                        </div><br/>
                        <h5 className="center"><b>{props.title}</b></h5>
                    </div>
                </div>
                </div>
            </div>
            <div class="flip-box-back">
                <h4><a href="/dashboard">{props.title}</a></h4>
                <h5>{props.desc}</h5>
            </div>
        </div>
    </div> 
)

export default dashboardIcons;