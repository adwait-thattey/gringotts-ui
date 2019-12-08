import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import classes from './sidelayout.module.css';
import Tree from '../../components/TreeView/tree';
import API from '../../utils/axios';


class SideLayout extends Component {
    state = {
        tree: null
    }

    async componentDidMount() {
        try {
            const res = await API.get('api/engine', { headers: { "auth-token": `Bearer ${localStorage.getItem('AUTH_TOKEN')}` } });
            const formattedData = this.formatData(res.data);
            this.setState({ tree: formattedData })
        } catch(e) {
            console.log(e);
        }
    }

    formatData = (list) => {
        const kv = [];
        const aws = []
        for (let element of list) {
            switch (element.type) {
                case 'kv':
                    kv.push({
                        name: element.name,
                        sub: element.categories
                    })
                    break;

                case 'aws':
                    aws.push({
                        name: element.name,
                        sub: element.roles || []
                    })
                    break;
                default:
            }
        }
        return {
            aws,
            kv
        }
    }

    render() {
        const { tree } = this.state;


        return (
            <Row>
                <div style={{ height: '95vh' }}>
                    <Col l={3}>
                        <aside className="hide-on-med-and-down">
                            <section className={classes.leftside}>
                                <h1>
                                    {tree && <Tree 
                                                tree={tree}
                                            />
                                    }
                                </h1>
                            </section>
                        </aside>
                    </Col>
                    <Col s={12} l={9}>
                        <section className={classes.rightside}>
                            {this.props.children}
                        </section>
                    </Col>
                </div>
            </Row>
        );
    }
}

export default SideLayout;