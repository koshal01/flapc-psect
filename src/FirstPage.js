import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import './headbar.css'; 

// To display the load curve
class FirstPage extends Component {
    
    render() {
        return (
            <div classsName="center">
                <IconContext.Provider value={{ color: '#fff' }}>
                    <div className="navbar1">
                        <Link to="/">
                            <h1 id='title'>Unit Commitment</h1>
                        </Link>
                        <h2 id='PageTitle'>Full Load Average Production Cost</h2>
                    </div>
                </IconContext.Provider>

                <div className="center-image">
                    <img src="https://images.thequint.com/thequint/2019-09/7df4c055-a59c-489e-8773-5dedfa035697/iStock_987567978.jpg?rect=0%2C0%2C2121%2C1193&auto=format%2Ccompress&fmt=webp"  style = {{height: 'inherit'}} alt="firstpage"/>
                </div>
                <Link to="/Input" className='center-button remove'>
                    <Button variant="outline-primary">Get Started</Button>
                </Link>
            </div>
        );
    }
}

export default FirstPage;