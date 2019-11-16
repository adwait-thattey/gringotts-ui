import React from 'react';
import './IconsBlock.css';

const IconsBlock = (props) => {
    return(
        <div className="IconsDiv">
            <div className="row">
                <div>
                    <center><h3><b>Services</b></h3></center>
                    <br/><br/>
                </div>
                <div className='col l12'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default IconsBlock;