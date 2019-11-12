import React, {Component} from 'react';
// import layout from '../../hoc/Layout/Layout';
import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Nav/Toolbar/Toolbar';
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/Nav/SideNav/SideNav';

class Dashboard extends Component {
    render(){
        return(
            <Aux>
                <Toolbar />
                <SideNav />
                <Footer />
            </Aux>
        );
    }
}

export default Dashboard;


