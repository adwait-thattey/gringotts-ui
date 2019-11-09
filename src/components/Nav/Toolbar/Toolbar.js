import React from 'react'
import './Toolbar.css';
import Logo from '../../Logo/Logo'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (

	<header>
        <nav class="#1976d2 blue darken-2" style={{ position: 'fixed', zIndex: '100'}} >
            <div id="menu">
                <ul class="left hide-on-med-and-down">
                    <li><DrawerToggle clicked={props.drawerToggleClicked} /></li>
                    <li><a href="/dashboard"><Logo /></a></li>
                </ul>
                <a href="/dashboard" class="logoName" id="logo">GRINGOTTS</a>                
                <ul class="right">
                    <li>
                        <div class="center row hide-on-med-and-down">
                            <div class="col s12 ">
                                <div class="row" id="topbarsearch">
                                    <div class="input-field col s6 s12">
                                        <form action="/questions/browse" method="get" autocomplete="off">
                                            <i class="material-icons prefix"></i>
                                            <input style={{ fontSize: '1.8rem', fontFamily: "Raleway, sans-serif"}} type="text" placeholder="Search" id="autocomplete-input" name="query" class="autocomplete white-text" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
					<ul class="right hide-on-med-and-down">
						<li ><a href="/dashboard" style={{ fontSize: '1.8rem'}}><strong></strong></a></li>
						<li><a href="/dashboard" style={{ fontSize: '1.8rem'}}><b>Sign Out</b></a></li>
					</ul>     
                </ul>
            </div>
        </nav>
    </header>

)

export default toolbar