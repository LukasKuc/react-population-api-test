import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Feather from '../../node_modules/feather-icons';


class Header extends Component {

    componentDidMount() {
        Feather.replace();
    }
    render() {
        return (
<nav className="col-sm-12 col-md-2 d-md-block bg-light sidebar">
<div className="sidebar-sticky">
  <ul className="nav flex-column">
    <li className="nav-item">
        <Link className="nav-link" to="/" ><span data-feather="home"></span> Home</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/reports"><span data-feather="file"></span> Reports</Link>
    </li>
  </ul>
</div>
</nav>
        );
    }
}

export default Header;
