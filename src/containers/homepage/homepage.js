import React, { Component } from 'react';

import credentialsImage from '../../images/components/cards/Credentials.jpeg';
import dynmCreds from '../../images/components/cards/DynmCreds.png';
import sshImage from '../../images/components/cards/ssh.png';
import gpgImage from '../../images/components/cards/GPG.png';

import Layout from '../../hoc/Layout/Layout';
import IconsBlock from '../../components/DashboardItems/IconsBlock/IconsBlock';
import DashboardIcons from '../../components/DashboardItems/IconsBlock/DashboardIcons/DashboardIcons';
import DashboardBlocks from '../../components/DashboardItems/DashboardBlocks/DashboardBlocks';

class Homepage extends Component {
    state = {
        cards : {
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
            Desc: "Making Use of GPG Keys you can easily exchange data on insecure public channels with the Gringotts encrypting the data for you.",
        }
    }
    }

    render() {

        const transformedIcons = Object.keys(this.state.cards)
        .map((c)=>(
            <div className="col s12 m6 l3">
                <DashboardIcons 
                    image={this.state.cards[c].Image}
                    title={this.state.cards[c].Title} 
                    desc={this.state.cards[c].Desc}
                />
            </div>
        ));

        const transformedBlocks = Object.keys(this.state.cards)
        .map((c)=>(            
            <DashboardBlocks 
                image={this.state.cards[c].Image}
                title={this.state.cards[c].Title} 
                desc={this.state.cards[c].Desc}
            />           
        ));
        

        return (
            <Layout>
                <section>
                    <IconsBlock> {transformedIcons} </IconsBlock>
                    {transformedBlocks}              
                </section>
            </Layout>   
        );
    }
}

export default Homepage;