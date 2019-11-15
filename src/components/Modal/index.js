import React from 'react';
import classes from "./style.module.css";
import Loader from '../../images/components/logo/Loader.svg';

const Modal = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.modalData}>
                <h1>HI There</h1>
                <img style={{ width: '50px', height: '50px' }} src={Loader} alt="Loader"/>
            </div>
        </div>
    );
}

export default Modal;