import React from 'react'
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { BsMusicNoteList } from 'react-icons/bs';


const Navi = (props) => {

    return (
      <Navbar className='color-nav rounded-bottom' >
        <div className='navi-container'>
        <div className='navi-header'>
        <BsMusicNoteList />
        <Navbar.Brand id="title"> Pitch Please</Navbar.Brand>
        </div>
          {!localStorage.id ? ( 
              <Nav className='mr-auto'>
                    <Nav.Link id="login" href='/login'>Login</Nav.Link>
                    <Nav.Link id="signup" href='/signup'>Sign Up</Nav.Link>               
              </Nav> 
          ) : (
               <Nav className='mr-auto'>
                    <Nav.Link id='intGame' href="/interval">Interval Game</Nav.Link>
                    <Button id='logout' variant="outline-light" onClick={props.handleLogout}>Logout</Button>
              </Nav> 
          )}
            </div>
        </Navbar>   
    );
  };
  
  export default Navi;
  