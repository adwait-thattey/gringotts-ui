import React from 'react';
import classes from './style.module.css';
import { Row, Col } from 'react-materialize';

const Card = ({ text, left, right }) => {
    return (
        <div
            className={classes.cardWrapper}
            style={{ background: `${right}` }}
        >
            <Row>
                <Col l={6}>
                    <div style={{ margin: '20px' }}>
                        <h6 className={classes.heading}>{text}</h6>
                        <p className={classes.subinfo}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </Col>
                <Col l={6}>
                    <div className={classes.imgDiv}>
                        <img className={classes.img} src="https://www.besttechie.com/wp-content/uploads/2018/01/top-5-cloud-service-providers.png"></img>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Card;