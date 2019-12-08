import React from 'react'
import './Toolbar.css';
import Logo from '../../Logo/Logo'
// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (

	<header className="header">
        <nav className="cyan darken-4">
            <div id="menu">
                <ul className="left">
                    <li className="hide-on-med-and-down">{props.toggleButton}</li>
                    <li><a href="/"><Logo /></a></li>
                </ul>
                <a href="/" className="logoName" id="logo">GRINGOTTS</a>                
                <ul className="right">
                    <li>
                        <div className="center row hide">
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
					<ul className="right">
						{/* <li ><a href="/"><b>Sign Up</b></a></li> */}
						<li><a href="/"><b>Sign In</b></a></li>
                        <li><a href="/"><b>Sign Up</b></a></li>
					</ul>     
                </ul>
            </div>
        </nav>
    </header>

)

export default toolbar