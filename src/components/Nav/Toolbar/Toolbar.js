import React from 'react'
import './Toolbar.css';
import Logo from '../../Logo/Logo'
// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (

	<header className="header">
        <nav className="#1976d2 blue darken-2">
            <div id="menu">
                <ul className="left hide-on-med-and-down">
                    <li>{props.toggleButton}</li>
                    <li><a href="/"><Logo /></a></li>
                </ul>
                <a href="/" className="logoName" id="logo">GRINGOTTS</a>                
                <ul className="right">
                    <li>
                        <div className="center row hide-on-med-and-down">
                            <div className="col s12 ">
                                <div className="row" id="topbarsearch">
                                    <div className="input-field col s6 s12">
                                        <form action="/questions/browse" method="get" autoComplete="off">
                                            <i className="material-icons prefix"></i>
                                            <input style={{ fontSize: '1.8rem', fontFamily: "Raleway, sans-serif"}} type="text" placeholder="Search" id="autocomplete-input" name="query" className="autocomplete white-text" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
					<ul className="right hide-on-med-and-down">
						{/* <li ><a href="/"><b>Sign Up</b></a></li> */}
						<li><a href="/"><b>Sign Out</b></a></li>
                        <li></li>
					</ul>     
                </ul>
            </div>
        </nav>
    </header>

)

export default toolbar