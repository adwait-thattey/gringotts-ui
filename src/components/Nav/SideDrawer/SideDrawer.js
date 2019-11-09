import React from 'react';
import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer =(props) => {
    let attachedClasses = 'Close'; 
    if(props.open) {
        attachedClasses = 'Open';
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses}>
                <div className='logoDiv' >
                    <ul>
                        <li><Logo /></li>
                        <li><a href="/dashboard">GRINGOTTS</a></li>
                    </ul>
                </div><hr />
                <div className='navDiv'>
                    <h3><b>Services</b></h3>
                    <ul className="navItems">
                        <li><a href='/dashboard'>Credential Manager </a> </li>  
                        <li><a href='/dashboard'>Dynamic Credentials </a> </li>  
                        <li><a href='/dashboard'>SSH Keys </a> </li>  
                        <li><a href='/dashboard'>GPG  </a> </li>  
                    </ul>
                    
                </div>
            </div>
        </Aux> 
    )

}

export default sideDrawer;