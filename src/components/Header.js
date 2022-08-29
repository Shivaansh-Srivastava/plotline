import React from "react";
import logo from '../images/pl-logo_svg.svg'

class Header extends React.Component
{
    constructor()
    {
        super()
    }

    render()
    {
        return(
            <div className="header-bar">
                <ul className="header-ul">
                    <li>
                        <img src={logo} alt="logo"/>
                    </li>
                    <li>
                        <h6 className="header-txt">Data</h6>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header