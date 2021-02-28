import React from "react";
import { NavLink } from "react-router-dom";
import {Navbar, Nav, Button} from "react-bootstrap"
import { BsMusicNoteList } from 'react-icons/bs'


const Navi = ({ user, handleLogout }) => {

    return (
      <Navbar className='color-nav rounded-bottom' >
        <div className='navi-container'>
        <div className='navi-header'>
        <BsMusicNoteList />
        <Navbar.Brand>Pitch Please</Navbar.Brand>
        </div>
          {!user.id ? ( 
              <div className="navi-login">
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">   Sign up</Nav.Link>
                </Nav>
              </div> 
          ) : (
               <Nav> 
                <div className="navi-login">
                    <Nav.Link href="/interval">Play the Interval Game</Nav.Link>
                    <Nav.Link href="/user"> Profile</Nav.Link> 
                    <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                </div>
              </Nav> 
          )}
            </div>
        </Navbar>   
    );
  };
  
  export default Navi;
  