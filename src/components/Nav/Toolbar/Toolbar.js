import React from 'react'

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.scss';
import Logo from '../../Logo/Logo'

const toolbar = props => (
  <div className="toolbar">
    <nav className="toolbar__navigation">
      <div>
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className="toolbar__logo">
        <a href="#">
          <div className="toolbar__logo__image">
            <Logo size={'6rem'}/>
          </div>
          <div className="toolbar__logo__text-box">
            GRINGOTTS
          </div>
        </a>
      </div>
      <div className="spacer" />
      <div className="toolbar__navigation-items">
        <ul>
          <li>
            <a href="/">SignUp</a>
          </li>
          <li>
            <a href="/">LogIn</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
)

export default toolbar