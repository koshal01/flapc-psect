import React, { Component } from 'react'
import './headbar.css';
import { IconContext } from 'react-icons';
import { Link, NavLink } from 'react-router-dom';

class Headbar extends Component {
    render() {
        return (
            <div>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <div className="navbar1">
                        <Link to="/">
                            <h1 id='title'>Unit Commitment</h1>
                        </Link>
                        <h2 id='PageTitle'>Full Load Average Production Cost</h2>
                    </div>
                </IconContext.Provider>

                {/* <div style={{
                    display: "flex",
                    background: '#0d6efd',
                    padding: '5px 0 5px 5px',
                    fontSize: '20px'}}>

                    <div style={{ margin: '10px 10px 10px 75px' }}>
                        <NavLink to="/Approach" style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white'})} className = 'title'> Approach </NavLink>
                    </div>

                    <div style={{ margin: '10px' }}>
                        <NavLink to="/Input" style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white'})}> Input </NavLink>
                    </div>

                    <div style={{ margin: '10px' }}>
                        <NavLink to="/LoadGraph" style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white'})}> Load Graph </NavLink>
                    </div>

                    <div style={{ margin: '10px' }}>
                        <NavLink to="/LoadList" style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white'})}> Priority List </NavLink>
                    </div>

                    <div style={{ margin: '10px' }}>
                        <NavLink to="/LoadGenerator" style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white'})}> Load Priority List </NavLink>
                    </div>
                </div> */}
                
                <ul className='list'>
                    <li className="list-anchor"><NavLink to="/Approach"  style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white', fontWeight: isActive ? 'bold' : '100', fontFamily: 'Montserrat'})} > Approach </NavLink></li>
                    <li className="list-anchor"><NavLink to="/Input"     style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white', fontWeight: isActive ? 'bold' : '100', fontFamily: 'Montserrat'})}> Input </NavLink></li>
                    <li className="list-anchor"><NavLink to="/LoadGraph" style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white', fontWeight: isActive ? 'bold' : '100', fontFamily: 'Montserrat'})}> Load Graph </NavLink></li>
                    <li className="list-anchor"><NavLink to="/LoadList"  style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white', fontWeight: isActive ? 'bold' : '100', fontFamily: 'Montserrat'})}> Priority List </NavLink></li>
                    <li className="list-anchor"><NavLink to="/LoadGenerator" style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white', fontWeight: isActive ? 'bold' : '100', fontFamily: 'Montserrat'})}> Load Priority List </NavLink></li>
                </ul>
            </div>
        );
    }

}

export default Headbar
