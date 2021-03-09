import React from 'react'
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button} from "react-bootstrap";
import { BsMusicNoteList } from 'react-icons/bs';


const Navi = (props) => {

    return (
      <Navbar className='color-nav rounded-bottom' >
        <div className='navi-container'>
        <div className='navi-header'>
        <Nav>
        <BsMusicNoteList />
        <Navbar.Brand id="title"> Pitch Please</Navbar.Brand>
        
        </Nav>
        </div>
          {!localStorage.id ? ( 
              <Nav className='mr-auto'>
                    <Nav.Link id="login" href='/login'>Login</Nav.Link>
                    <Nav.Link id="signup" href='/signup'>Sign Up</Nav.Link>               
              </Nav> 
          ) : (
               <Nav className='mr-auto'>
                    <div class="dropdown">
                      <button class="dropbtn">Train Your Ear</button>
                      <div class="dropdown-content">
                        <a href='/interval'>Interval Game</a>
                        <a href='/chord'>Chord Game</a>
                      </div>
                    </div> 
                 
                    <Button id='logout' variant="outline-light" onClick={props.handleLogout}>Logout</Button>
              </Nav> 
          )}
          </div>
        </Navbar>   
    );
  };
  
  export default Navi;
  