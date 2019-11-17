import React from 'react';
import classes from "./style.module.css";
import Loader from '../../images/components/logo/Loader.svg';

const Modal = ({ isLoading, info }) => {

    const data = (
        <div className={classes.dataWrapper}>
            <div>
                <h4>{info.credNameLabel}</h4>
                <h3>{info.credName}</h3>
            </div>
            <div>
                <h4>{info.credValueLabel}</h4>
                <h3>{info.credValue}</h3>
            </div>
        </div>
    )

    return (
        <div className={classes.modal}>
            <div className={classes.modalData}>
                    {
                        isLoading ? (
                            <img style={{ width: '50px', height: '50px' }} src={Loader} alt="Loader"/>
                        ) : {data}
                    }
            </div>
        </div>
    );
}

export default Modal;