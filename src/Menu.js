import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faLayerGroup, faPlus, faAngleDoubleRight, faAngleDoubleLeft, faSignOutAlt, faHandshake, faClock, faEye, faUser } from '@fortawesome/free-solid-svg-icons';

import './Menu.css'
library.add(faTimes, faEdit, faLayerGroup, faPlus, faAngleDoubleRight, faAngleDoubleLeft, faSignOutAlt, faHandshake, faClock, faEye, faUser);
function Menu() {
    const [collapse, setCollapse] = useState(false)
    return (
        <CSSTransition
            in={collapse}
            classNames="header"
            timeout={300}
        >
            <header>
                <nav>
                    <form>
                        <input type="search" placeholder='chaine' />
                        <button type="submit"><FontAwesomeIcon icon="plus" /></button>
                    </form>

                    <button className="collapse-btn" onClick={() => setCollapse(!collapse)}><FontAwesomeIcon icon={collapse ? "angle-double-right" : "angle-double-left"} /></button>
                </nav>
                <nav className="streams">
                    <p style={{ textAlign: "center", background: "#b34646", cursor: "default", height: "24px" }}>hgg</p>
                </nav>
            </header>
        </CSSTransition>
    )
}

export default Menu