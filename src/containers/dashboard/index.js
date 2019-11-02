import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import Card from '../../components/card/card';
import '../../App.scss';

class Dashboard extends Component {
    state = {  

    }

    render() { 
        return (  
            <section>
                <Row>
                    <Col l={4}>
                        <h1>Hi</h1>
                    </Col>
                    <Col l={8}>
                        <Row>
                            <Col l={6}>
                                <div className="card-wrapper">
                                    <Card 
                                        text="Credentials"
                                        left="#7c69f4"
                                        right="#5546f2"
                                    />
                                </div>
                            </Col>
                            <Col l={6}>
                                <div className="card-wrapper">
                                    <Card 
                                        text="Dynamic Credentials"
                                        left="#ffb347"
                                        right="#ffcc33"
                                    />
                                </div>
                            </Col>
                            <Col l={6}>
                                <div className="card-wrapper">
                                    <Card 
                                        text="SSH"
                                        left="#83a4d4"
                                        right="#b6fbff"
                                    />
                                </div>
                            </Col>
                            <Col l={6}>
                                <div className="card-wrapper">
                                    <Card
                                        text="GPG"
                                        left="#870000"
                                        right="#190a05"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </section>
        );
    }
}
 
export default Dashboard;