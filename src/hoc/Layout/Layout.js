import React, {Component} from 'react';
import Aux from '../Aux/Aux'; 
import Toolbar from '../../components/Nav/Toolbar/Toolbar';
import Footer from '../../components/Footer/Footer';
import SideDawer from '../../components/Nav/SideDrawer/SideDrawer';
import DrawerToggle from '../../components/Nav/SideDrawer/DrawerToggle/DrawerToggle';

class layout extends Component {
    state ={
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState(
            {showSideDrawer: false}
        )
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { 
            return {showSideDrawer: !prevState.showSideDrawer}; 
        });  
    }

    render(){
        return (
            <Aux>   
                <Toolbar toggleButton={<DrawerToggle clicked={this.sideDrawerToggleHandler}/>} />
                <SideDawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main>
                    {this.props.children}
                </main>
                <Footer />
            </Aux>
        );
    }
};

export default layout;