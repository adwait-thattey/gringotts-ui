import React from 'react';

import './logo.scss';

import logo_back_snake from '../../images/components/logo/back-snake.png';
import logo_coloured_snake from '../../images/components/logo/coloured-snake.png';
import logo_inverted_vault from '../../images/components/logo/inverted-vault.png';


const logo = (props) => {

    const style = {
        height : props.size? props.size: '6rem',
        width: props.size? props.size: '6rem'
    };

    const innerLogo = () => {

        if (props.rotate){
            return (
                <img src={logo_coloured_snake} className="logo logo__inner-image logo__inner-image--rotate" alt="Inner Logo" />
            )
        }

        else {
            return (
                <img src={logo_coloured_snake} className="logo logo__inner-image " alt="Inner Logo" />
            )
        }
    };

    return (
        <div className="logo logo__container" style={style}>
            <img src={logo_back_snake} className="logo logo__back-image" alt="Razer Logo" />
            <img src={logo_inverted_vault} className="logo logo__vault-image" alt="Vault Logo" />
            {innerLogo()}
        </div>
    );
};

export default logo;