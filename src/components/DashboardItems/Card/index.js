import React from 'react';
import classes from './style.module.css';

const Card = ({ categoryName, credList }) => {
    return (  
        <div className={classes.card}>
            <h3>{categoryName}</h3>
            <ul>
                {credList.map((cred, index) => (
                    <li key={index}>{cred}</li>
                ))}
            </ul>
        </div>
    );
}
 
export default Card;