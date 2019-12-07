import React, { Component } from 'react';
import CredCard from "../../components/KV/CredCard/CredCard";
import M from 'materialize-css';
import API from '../../utils/axios';
import SideLayout from '../../hoc/sidelayout/sidelayout';
import { toast } from 'react-toastify';
import classes from './style.module.css';
import DateString from '../../utils/date';

class SSH extends Component {

    state = {
        info: null,
        selectedMachine: null
    }

    getRequiredEngine = (engineList) => {
        return engineList.find(engine => engine.type === "ssh" && engine.name === "ssh5")
    }

    async componentDidMount() {
        const res = await API.get('api/engine/', { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } });
        const mySSHEngine = this.getRequiredEngine(res.data);

        const data = this.getData();
        this.setState({ info: data });
    }

    getData = () => {
        return {
            _id: "1234567890",
            engineType: "ssh",
            engineName: "eng1",
            status: 0,

            roles: [
                {
                    _id: "$1234567890",
                    verboseName: "role1",
                    remote_machine_ip: "192.168.0.1",
                    remote_machine_username: "brijesh",
                    remote_machine_domain: "https://kuckduckoo.com",
                    ttl: "some-ttl",

                    generated_keys: [
                        {
                            _id: "$$1234567890",
                            generated_on: new Date().toString(),
                            public_key: "public key",
                            serialNumber: "263846137613"
                        },
                        {
                            _id: "$$1234567098",
                            generated_on: new Date().toString(),
                            public_key: "public key 2",
                            serialNumber: "126891891356"
                        },
                        {
                            _id: "$$1234567811",
                            generated_on: new Date().toString(),
                            public_key: "public key 3",
                            serialNumber: "648916516511"
                        }
                    ]
                }
            ]
        }
    }

    getGenCreds = (_id) => {
        const { info } = this.state;
        const data = info.roles.find(role => role._id === _id);
        this.setState({ selectedMachine: data });
    }

    configureCA = () => {
        const updatedInfo = { ...this.state.info };
        updatedInfo.status = 1;
        this.setState({ info: updatedInfo });
    }

    render() {

        const { info, selectedMachine } = this.state;

        return (
            <SideLayout>
                <section>
                    <h1 className="cyan-text text-darken-4 title page-title">SSH Systems</h1>

                    <div className={classes.CAConfig}>
                        {info && (
                            <div className="row">
                                <div className="col s12 l6">
                                    {info.status === 0 ? (
                                        <div className={classes.configText}>
                                            <button onClick={this.configureCA} className="waves-effect waves-light btn-large">Configure</button>
                                        </div>
                                    ) : (
                                            <div className={classes.configText}>
                                                <button onClick={this.configureCA} className="waves-effect waves-light btn-large">
                                                    <i className="material-icons">check</i>
                                                </button>
                                            </div>
                                        )}
                                </div>
                                <div className="col s12 l6" style={{ height: '100%' }}>
                                    {info.status === 0 ? (
                                        <div className={classes.configBtn}>
                                            <div>
                                                <p>
                                                    To use the ssh system, An ssh engine should be configured
                                                    by generating a Certificate Authority
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={classes.configBtn}>
                                            <div>
                                                <p>
                                                    You have successfully configured the ssh engine
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}
                    </div>

                    <div className={classes.CAConfig}>
                        <h2 className="cyan-text text-darken-4 title page-title" style={{ paddingLeft: "1rem", paddingTop: "1rem" }}>Add New Machine</h2>
                        <div className="divider cred-card-divider" />
                        <div className="row">
                            <div className={`${classes.inputField}`} style={{ height: '100%' }}>
                                <div className="input-field col s12 l4">
                                    <input id="ip_address" type="text" className="validate" placeholder="IP Addreess" />
                                    {/* <label style={{ paddingBottom: "20px" }} htmlFor="ip_address">IP address</label> */}
                                </div>
                                <div className="input-field col s12 l3">
                                    <input id="username" type="text" className="validate" placeholder="Username" />
                                    {/* <label style={{ fontSize: "20px", paddingBottom: "20px" }} htmlFor="username">Username</label> */}
                                </div>
                                <div className="input-field col s12 l3">
                                    <input id="domain_name" type="text" className="validate" placeholder="Domain Name" />
                                    {/* <label style={{ fontSize: "20px" }} htmlFor="domain_name">Domain</label> */}
                                </div>
                                <div className={classes.addMachineBtn}>
                                    <button className="waves-effect waves-light btn">Add Machine</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.CAConfig}>
                        <h2 className="cyan-text text-darken-4 title page-title" style={{ paddingLeft: "1rem", paddingTop: "1rem" }}>Machines Configured</h2>
                        <div className="divider cred-card-divider" />
                        {info && (
                            <div className={classes.listTable}>
                                <table className="striped responsive-table">
                                    <thead>
                                        <tr className="cyan-text text-darken-4">
                                            <th>IP</th>
                                            <th>Username</th>
                                            <th>Domain</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {info.roles.map((machine, index) => (
                                            <tr key={index} onClick={() => this.getGenCreds(machine._id)}>
                                                <td>{machine.remote_machine_ip}</td>
                                                <td>{machine.remote_machine_username}</td>
                                                <td>{machine.remote_machine_domain}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {selectedMachine && (
                        <div className={classes.CAConfig}>
                            <h2 className={classes.addMachineHeading}>Generated Keys</h2>
                            <div className={classes.listTable}>
                                <table className="striped responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Public Key</th>
                                            <th>Generated On</th>
                                            <th>Expired?</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {selectedMachine.generated_keys.map(key => (
                                            <tr>
                                                <th>{key.serialNumber}</th>
                                                <th>{DateString(key.generated_on)}</th>
                                                <th>{key.isExpired}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </section>
            </SideLayout>
        )
    }
}

export default SSH;