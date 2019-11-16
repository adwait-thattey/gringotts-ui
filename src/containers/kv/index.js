import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import classes from './style.module.css';
import Card from '../../components/DashboardItems/Card/index';
import Modal from '../../components/Modal/index';

class Engine extends Component {
    state = {
        categories: null,
        isShowing: true,
        info: {
            credNameLabel: null,
            credName: null,
            credValueLabel: null,
            credValue: null
        }
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

    getCreds = () => {

    }

    closeModal = () => {
        this.setState({ isShowing: false });
    }

    componentDidMount () {
        this.setState({ categories: this.getCategories() })
    }

    render() {
        const { categories, isShowing, info } = this.state;

        return (
            <Row onClick={this.closeModal}>
                {isShowing && <Modal 
                    isLoading={false}
                    credNameLabel={info.credNameLabel}
                    credName={info.credName}
                    credNameLabel={info.credNameLabel}
                    credNameLabel={info.credNameLabel}
                />}
                <div className={`${classes.wrapper} ${isShowing && classes.hide}`}>
                    <Col l={3}>
                        <aside>
                            <section className={classes.leftside}>
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