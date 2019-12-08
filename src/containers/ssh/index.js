import React, { Component } from 'react';
import CredCard from "../../components/KV/CredCard/CredCard";
import M from 'materialize-css';
import API from '../../utils/axios';
import SideLayout from '../../hoc/sidelayout/sidelayout';
import { toast } from 'react-toastify';
import classes from './style.module.css';
import DateString from '../../utils/date';
import { download } from 'downloadjs';

class SSH extends Component {

    state = {
        info: null,
        selectedMachine: null,
        engineName: null,
        newMachineForm: {
            hostIP: '',
            hostUsername: '',
            hostDomain: '',
            ttl: null
        },
        key: {
            keyName: null,
            keyPassword: null,
        },
        // Using this variable to show download key option
        receivedCreds: false
    }

    getRequiredEngine = (engineList, engName) => {
        return engineList.find(engine => engine.type === "ssh" && engine.name === engName)
    }

    getEngineNameFromUrl = (url) => {
        const locationSplitBySlash = url.split('/');
        return locationSplitBySlash[locationSplitBySlash.length - 1];
    }

    async componentDidMount() {
        const engineName = this.getEngineNameFromUrl(this.props.location.pathname);

        const res = await API.get('api/engine/', { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } });
        const mySSHEngine = this.getRequiredEngine(res.data, engineName);

        this.setState({ info: mySSHEngine, engineName });

    }

    handleChange = (e) => {
        const target = e.target.name;
        const value = e.target.value;

        const updateMachineForm = { ...this.state.newMachineForm };
        updateMachineForm[target] = value;

        if (target === "ttl") {
            updateMachineForm[target] = `${value}m0s`;
        }

        this.setState({ newMachineForm: updateMachineForm });
    }

    handleChange2 = (e) => {
        const target = e.target.name;
        const value = e.target.value;

        const updateKey = { ...this.state.key };
        updateKey[target] = value;

        this.setState({ key: updateKey });
    }


    addNewMachine = async () => {
        const { ttl, hostDomain, hostIP, hostUsername } = this.state.newMachineForm;

        if (!hostDomain || !hostIP || !hostUsername || !ttl) {
            toast.error("Some details are not filled");
            return;
        }

        const info = { ...this.state.info };
        const infoRoles = [...info.roles];
        infoRoles.push({
            machine_ip: hostIP,
            machine_username: hostUsername,
            machine_domain: hostDomain
        })

        info.roles = infoRoles;

        try {
            const res = await API.post(
                `api/ssh/${this.state.engineName}/machines`,
                this.state.newMachineForm,
                { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } }
            );


            this.setState({ info })

            toast.success("Machine successfully added");
        } catch (e) {
            toast.error("Some error occured");
        }
    }

    getGenCreds = (_id) => {
        const { info } = this.state;
        const data = info.roles.find(role => role._id === _id);
        this.setState({ selectedMachine: data, receivedCreds: false });
    }

    configureCA = async () => {
        try {
            const res = await API.post(
                `api/ssh/${this.state.engineName}/ca`,
                {},
                { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } }
            )
            window.location.reload()
            toast.success("Successfully Configured Certificate Authority");
        } catch (e) {
            toast.error("Some error occured");
        }
    }

    getCAKey = async () => {
        const res = await API.get(
            `api/ssh/${this.state.engineName}/ca/public_key`,
            { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } }
        )
        console.log(res.data.CAPublicKey);
    }

    genKey = async () => {
        const { verboseName } = this.state.selectedMachine;
        const { keyName, keyPassword } = this.state.key;

        if (!verboseName) {
            toast.error("Machine not selected");
            return;
        }

        if (!keyName || !keyPassword) {
            toast.error("Key Name or Key Password not set");
            return;
        }

        const dataObj = {
            ...this.state.key,
            role: verboseName
        }

        try {
            const res = await API.post(
                `api/ssh/${this.state.engineName}/generate_key`,
                dataObj,
                { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } }
            );
            toast.success("Keys successfully generated")
            this.setState({ receivedCreds: true });
        } catch (e) {
            toast.error("Some error occured")
            console.log(e);
        }
    }

    download = async (fileName) => {
        const response = await API.get("localhost:8000/brij6.cer");
        console.log(response);
    }

    render() {

        const { info, selectedMachine, receivedCreds, key } = this.state;

        return (
            <SideLayout>
                <section>
                    <h1 className="cyan-text text-darken-4 title page-title">SSH Systems</h1>

                    <div className={classes.CAConfig}>
                        {info && (
                            <div className="row">
                                <div className="col s12 l3">
                                    {info.status === 0 ? (
                                        <div className={classes.configText}>
                                            <button onClick={this.configureCA} className="waves-effect waves-light btn-large">Configure</button>
                                        </div>
                                    ) : (
                                            <div className={classes.configText}>
                                                <button className="circle waves-effect waves-light btn-large">
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
                                {info.status === 1 && (
                                    <div className={classes.configBtn}>
                                        <div>
                                            <button onClick={this.getCAKey} className="waves-effect waves-light btn-large">Get Key</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={classes.CAConfig}>
                        <h2 className="cyan-text text-darken-4 title page-title" style={{ paddingLeft: "1rem", paddingTop: "1rem" }}>Add New Machine</h2>
                        <div className="divider cred-card-divider" />
                        <div className="row">
                            <div className={`${classes.inputField}`} style={{ height: '100%' }}>
                                <div className="input-field col s12 l3">
                                    <input onChange={(e) => this.handleChange(e)} name="hostIP" id="ip_address" type="text" className="validate" placeholder="IP Addreess" />
                                </div>
                                <div className="input-field col s12 l3">
                                    <input onChange={(e) => this.handleChange(e)} name="hostUsername" id="username" type="text" className="validate" placeholder="Username" />
                                </div>
                                <div className="input-field col s12 l3">
                                    <input onChange={(e) => this.handleChange(e)} name="hostDomain" id="domain_name" type="text" className="validate" placeholder="Domain Name" />
                                </div>
                                <div className="input-field col s12 l2">
                                    <input onChange={(e) => this.handleChange(e)} name="ttl" id="ttl" type="text" className="validate" placeholder="Time to live (mins)" />
                                </div>
                                <div className={`${classes.addMachineBtn} col s12 l1`}>
                                    <button onClick={this.addNewMachine} className="waves-effect waves-light btn">Add Machine</button>
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
                                                <td>{machine.machine_ip}</td>
                                                <td>{machine.machine_username}</td>
                                                <td>{machine.machine_domain}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {selectedMachine && (
                        <div className={classes.CAConfig}>
                            <h2 style={{ paddingLeft: "1rem", paddingTop: "1rem" }} className={`${classes.addMachineHeading} cyan-text text-darken-4 title page-title`}>Credentials Generated</h2>
                            <div className={classes.listTable}>
                                <table className="striped responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Serial Number</th>
                                            <th>Generated On</th>
                                            <th>Expired?</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {selectedMachine.generated_keys.map((key, index) => (
                                            <tr key={index}>
                                                <th>{key.serialNumber}</th>
                                                <th>{DateString(key.generated_on)}</th>
                                                <th>{key.isExpired}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className={`${classes.inputField2}`} style={{ height: '100%' }}>
                                    <div className="input-field col s12 l4">
                                        <input onChange={(e) => this.handleChange2(e)} name="keyName" id="username" type="text" className="validate" placeholder="Key Name" />
                                    </div>
                                    <div className="input-field col s12 l4">
                                        <input onChange={(e) => this.handleChange2(e)} name="keyPassword" id="domain_name" type="text" className="validate" placeholder="Key Password" />
                                    </div>
                                    <div className={`${classes.addMachineBtn} col s12 l4`}>
                                        <button onClick={this.genKey} className="waves-effect waves-light btn">Generate Key</button>
                                    </div>
                                </div>
                            </div>
                            {receivedCreds && (
                                <div className={classes.downloadBox}>
                                    <div className="row">
                                        <div className="col l3">
                                            <a className="waves-effect waves-light btn" href={`http://127.0.0.1:8000/${key.keyName}`} download={`${key.keyName}.txt`} target="_blank">Private Key</a>
                                        </div>
                                        <div className="col l3">
                                            <a className="waves-effect waves-light btn" href={`http://127.0.0.1:8000/${key.keyName}.cer`} download={`${key.keyName}.cer`} target="_blank">Certificate Key</a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </SideLayout>
        )
    }
}

export default SSH;