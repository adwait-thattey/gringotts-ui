import React, { Component } from 'react';

import credentialsImage from '../../images/components/cards/Credentials.jpeg';
import dynmCreds from '../../images/components/cards/DynmCreds.png';
import sshImage from '../../images/components/cards/ssh.png';
import gpgImage from '../../images/components/cards/GPG.png';
import Layout from '../../hoc/Layout/Layout';
import IconsBlock from '../../components/DashboardItems/IconsBlock/IconsBlock';
import DashboardIcons from '../../components/DashboardItems/IconsBlock/DashboardIcons/DashboardIcons';
import DashboardCategoryCard from "../../components/DashboardItems/DashboardCategoryCard/DashboardCategoryCard";

import API from '../../utils/axios';

class Dashboard extends Component {
    state = {
        cards: {
            c1: {
                Title: "Credential Manager",
                Image: credentialsImage,
                Desc: "Keep all your Passwords, Keys, Tokens, Notes, Bank Accounts, Payment Cards safe and easy to find.",
            },
            c2: {
                Title: "Dynaminc Credentials",
                Image: dynmCreds,
                Desc: "You don't have to ever remember your credentials for ​AWS​,​ GCP​,​ Azure​ or other cloud services.",
            },
            c3: {
                Title: "SSH Keys",
                Image: sshImage,
                Desc: "SSH-keys are used to authenticate and connect to remote servers/machines",
            },
            c4: {
                Title: "Secured Transfer of data (GPG)",
                Image: gpgImage,
                Desc: "Making Use of GPG Keys you can easily exchange data on insecure public channels with the gringotts encrypting the data for you.",
            }
        },
        categories: [
            {
                name: 'kv',
                verboseName: 'Credential Manager',
                image: credentialsImage,
                description: "Info about credential engine"
            },
            {
                name: 'aws',
                verboseName: 'Dynamic Credentials - AWS',
                image: dynmCreds,
                description: "Info about AWS engine"
            },
            {
                name: 'gcp',
                verboseName: 'Dynamic Credentials - GCP',
                image: dynmCreds,
                description: "Info about GCP engine"
            },
            {
                name: 'gpg',
                verboseName: 'GPG Data Sharing',
                image: gpgImage,
                description: "Info about GPG engine"
            },
            {
                name: 'ssh',
                verboseName: 'SSH Keys',
                image: sshImage,
                description: "Info about SSH engine"
            },

        ],
        engines: [],
        token: localStorage.getItem("AUTH_TOKEN")

    };

    createEngine = async type => {
        // call API to create engine
        try {
            const res = await API.post(`api/engine/${type}`, 
                {},
                { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } },
            );  
            const engines = this.state.engines;
            engines.push({ id:"xyz", name:"New Engine", type:type, ownedBy:"Sample user", createdOn:"sample date", health:true })
            
            this.setState({ engines: engines });
            console.log(res.data);
        } catch(e) {
            console.log(e.response);
            console.log(Object.keys(e));
        }

        // for sample
    };

    async componentDidMount() {
        try {
            const res = await API.get('api/engine/', { headers: { "auth-token": `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } }) 
            this.setState({ engines: this.getRequiredInfo(res.data) });
            console.log(res.data)
        } catch(e) {
            console.log(e);
        }
    }

    getRequiredInfo = (userObj) => {
        let obtainedEngines = [];

        userObj.map(engine => {
            obtainedEngines.push({
                id: engine.id,
                name: engine.name,
                type: engine.type,
                createdOn: new Date(engine.createdOn).toDateString(),
                health: true,
                credCount: engine.credCount
            })
        })

        return obtainedEngines;
    }

    render() {

        const transformedIcons = Object.keys(this.state.cards)
            .map((c, index) => (
                <div className="col s12 m6 l3" key={index}>
                    <DashboardIcons
                        image={this.state.cards[c].Image}
                        title={this.state.cards[c].Title}
                        desc={this.state.cards[c].Desc}
                    />  
                </div>
            ));

        const categoryCards = this.state.categories.map(cat => {
            // cat = cat.toLowerCase();
            let filteredEngines = this.state.engines.filter(eng => eng.type === cat.name)

            if (filteredEngines.length > 0) {
                return <DashboardCategoryCard
                    engines={filteredEngines}
                    title={cat.verboseName}
                    key={cat.name}
                    category={cat}
                    createEngine = {this.createEngine}
                />
            }
            return "";
        })

        return (
            <Layout>
                <section>
                    <IconsBlock> {transformedIcons} </IconsBlock>
                    {categoryCards}
                </section>
            </Layout>
        );
    }
}

export default Dashboard;


