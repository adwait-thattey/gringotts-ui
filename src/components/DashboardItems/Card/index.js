import React from 'react';
import classes from './style.module.css';

const Card = ({ categoryName, credList }) => {
    return (  
        <div className={classes.card}>
            <div className={classes.heading}>
                <h3>{categoryName}</h3>
                <h4 className={classes.faintText}>Credentials List</h4>
            </div>
            <ul>
                {credList.map((cred, index) => (
                    <li key={index} className={`colorObj${index % 3}`}>
                        <span>{cred}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default Card;