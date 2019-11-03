import React from 'react';

const Card = (props) => {
    return (
        <div className="card" >
            <div className="card -small" >
                <div className="card-image" >
                    <img src={props.image} alt="Imag" style={{ height: '150px', overflow: 'hidden',}} />
                </div>
                <div className={`card-content ${props.color}`}>
                    <span class="card-title activator grey-text text-darken-4"><strong>{props.title}</strong><i class="material-icons right">more_vert</i></span>
                </div>
                <div class="card-reveal ">
                    <span class="card-title grey-text text-darken-4"><strong>{props.title}</strong><i class="material-icons right">close</i></span>
                    <h5>{props.desc}</h5>
                </div>
            </div>
        </div>
    );
}


export default Card;