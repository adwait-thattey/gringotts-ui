import React, { Component } from 'react';
import Layout from '../../hoc/Layout/Layout';
import credentialsImage from '../../images/components/cards/Credentials.jpeg';
import dynmCreds from '../../images/components/cards/DynmCreds.png';
import sshImage from '../../images/components/cards/ssh.png';
import gpgImage from '../../images/components/cards/GPG.png';
import DashboardIcons from '../../components/DashboardItems/DashboardIcons';

class Dashboard extends Component {
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
            Desc: "Making Use of GPG Keys you can easily exchange data on insecure public channels with the grigotts encrypting the data for you.",
        }
    }
    }

    render() {

        const transformedCards = Object.keys(this.state.cards)
        .map((c)=>(
            <div className="col s12 m6 l3">
                <DashboardIcons 
                    image={this.state.cards[c].Image}
                    title={this.state.cards[c].Title} 
                    desc={this.state.cards[c].Desc}
                />
            </div>
        ));

        return (
            <Layout>
                <section>                                      
                    <div className='row' style={{ width: '90%', marginBottom: '80px'}}>
                        <div><center><h3><b>Services</b></h3></center><br/><br/></div>
                        <div className='col l12'>
                            {transformedCards}
                        </div>    
                    </div>                 
                </section>
            </Layout>   
        );
    }
}

export default Dashboard;