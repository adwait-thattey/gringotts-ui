import React from 'react';
import { Row, Col } from 'react-materialize';
import classes from './sidelayout.module.css';
import Tree from '../../components/TreeView/tree';

const SideLayout = (props) => {
    return (
        <Row>
            <div style={{ height: '95vh' }}>
                <Col l={3}>
                    <aside className="hide-on-med-and-down">
                        <section className={classes.leftside}>
                            <h1>
                                <Tree />
                            </h1>
                        </section>
                    </aside>
                </Col>
                <Col s={12} l={9}>
                    <section className={classes.rightside}>
                        {props.children}
                    </section>
                </Col>
            </div>
        </Row>
    );
}

export default SideLayout;