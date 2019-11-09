import React from 'react';
import './Backdrop.css';

const backdrop = (props) => {
    return (
        props.show ? <div className={'BackDrop'} onClick={props.clicked}></div> : null
    );
};

export default backdrop;