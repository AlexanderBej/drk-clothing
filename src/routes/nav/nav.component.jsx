import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as DrkLogo } from './../../assets/crown.svg';
import './nav.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <nav className="nav-bar">
                <Link className="logo-container" to='/'>
                    <DrkLogo className="logo" />
                </Link>
                <div className="links-container">
                    <Link to='/shop' className="nav-link">
                        SHOP
                    </Link>
                    <Link to='/authentication' className="nav-link">
                        SIGN IN
                    </Link>
                </div>
            </nav>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;