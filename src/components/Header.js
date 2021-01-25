import React from 'react';
// import Logo from './Logo';

const Header = ({titulo}) => {
    return (
        <nav>
            <div className="nav-wrapper light-blue darken-2">
                <a href="#!" className="brand-logo">{titulo}</a>
                {/* <Logo /> */}
            </div>
        </nav>
    );
}
 
export default Header;