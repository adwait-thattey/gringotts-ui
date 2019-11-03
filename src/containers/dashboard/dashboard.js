import React, { Component } from 'react';
import Card from '../../components/DashboardItems/card';

import credentialsImage from '../../images/components/cards/Credentials.png';
import sshImage from '../../images/components/cards/ssh.png';
import gpgImage from '../../images/components/cards/gpg.png';


class Dashboard extends Component {
    state = {
        cards : {
        c1: {
            Title: "Credentials",
            Image: credentialsImage,
            Desc: "Keep all your Passwords, Keys, Tokens, Notes, Bank Accounts, Payment Cards safe and easy to find.",
        },
        c2: {
            Title: "Dynaminc Credentials",
            Image: credentialsImage,
            Desc: "You don't have to ever remember your credentials for ​AWS​,​ GCP​,​ Azure​ or other cloud services.",
        },
        c3: {
            Title: "SSH",
            Image: sshImage,
            Desc: "SSH-keys are used to authenticate and connect to remote servers/machines",
        },
        c4: {
            Title: "GPG",
            Image: gpgImage,
            Desc: "Making Use of GPG Keys you can easily exchange data on insecure public channels with the grigotts encrypting the data for you.",
        }
    }
    }

    render() {

        const transformedCards = Object.keys(this.state.cards)
        .map((c)=>(
            <div className="col s12 m6 l4" style={{ margin: '30px',}}>
                <Card 
                    image={this.state.cards[c].Image}
                    title={this.state.cards[c].Title} 
                    desc={this.state.cards[c].Desc}
                />
            </div>
        ));

        return (
            <section>                     
                <div className='row' style={{ backgroundColor: '', width: '80%'}}>
                    <div><h4>Services</h4></div>
                    <div className='col l12'>
                        {transformedCards}
                    </div>
                </div>
            </section>
        );
    }
}

export default Dashboard;