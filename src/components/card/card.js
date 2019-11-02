import React from 'react';
import classes from './style.module.css';

const Card = ({ text, left, right }) => {
    return (  
        <div 
            className={classes.cardWrapper}
            style={{ background: `linear-gradient(to top, ${left}, ${right})` }}
        >
            <div className={classes.text}>
                <h6 className={classes.heading}>{text}</h6>
            </div>
        </div>
    );
}
 
export default Card;