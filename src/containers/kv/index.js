import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import classes from './style.module.css';
import Card from '../../components/DashboardItems/Card/index';

class Engine extends Component {
    state = {
        categories: null
    }

    getCategories = () => {
        return [
            {
                categoryName: "email",
                creds: ["gmail", "yahoo", "outlook"]
            },
            {
                categoryName: "entertainment",
                creds: ["netflix", "amazon prime", "zee5", "hotstar", "voot"]
            },
            {
                categoryName: "email",
                creds: ["gmail", "yahoo", "outlook"]
            },
            {
                categoryName: "entertainment",
                creds: ["netflix", "amazon prime", "zee5", "hotstar", "voot"]
            }
        ]
    }

    componentDidMount () {
        this.setState({ categories: this.getCategories() })
    }

    render() {
        const { categories } = this.state;

        return (
            <Row>
                <div className={classes.wrapper}>
                    <Col l={3}>
                        <aside>
                            <section className={classes.leftside}>
                                <h1>HI</h1>
                            </section>
                        </aside>
                    </Col>
                    <Col l={9}>
                        <section className={classes.rightside}>
                            <h1>Categories</h1>
                            <Row className={classes.customRow}>
                                {categories && categories.map((category, index) => (
                                    <Col l={6} key={index}>
                                        <div className={classes.cardWrapper}>
                                            <Card
                                                categoryName={category.categoryName}
                                                credList={category.creds}
                                            />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </section>
                    </Col>
                </div>
            </Row>
        );
    }
}

export default Engine;