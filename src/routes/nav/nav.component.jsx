import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as DrkLogo } from './../../assets/crown.svg';
import './nav.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

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
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                        ) : (
                            <Link to='/authentication' className="nav-link">
                                SIGN IN
                            </Link>
                        )
                    }
                </div>
            </nav>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;