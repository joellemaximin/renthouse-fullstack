import React, { useState , useEffect} from 'react';
import './gite.css';
import {
  Nav, Navbar, NavItem }
from 'react-bootstrap';

const Navigation = () => {

  const [isLoggedIn, setLoggedIn] = useState(false);

  return(
    <div>
        <Nav className="navbar" defaultActiveKey="/" as="ul">

          <Nav.Item as="li">
            <Nav.Link href="/">Accueil</Nav.Link>
          </Nav.Item>
          
          <Nav.Item as="li">
            <Nav.Link eventKey="link-1" href="/contact-hote">Hote</Nav.Link>
          </Nav.Item>
         
          {/* <Nav.Item as="li">
            <Nav.Link eventKey="link" href="/choose-language">fr</Nav.Link>
          </Nav.Item> */}

          <Nav.Item as="li">
            <Nav.Link eventKey="link-3" href="/gallery">Photos</Nav.Link>
          </Nav.Item>

          <Nav.Item as="li">
            <Nav.Link eventKey="link-3" href="/tourisme">Tourisme</Nav.Link>
          </Nav.Item>

          {/*connexion client or admin */}
          
          <Navbar.Collapse>
          {/* <Nav pullRight>
            {isLoggedIn ? (
              <>
                <LinkContainer to="/settings">
                  <NavItem>Settings</NavItem>
                </LinkContainer>
                <NavItem onClick={Logout}>Logout</NavItem>
              </>
            ) : (
              <>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-4" href="/login">Connexion</Nav.Link>
              </Nav.Item>
              </>
            )}
          </Nav> */}
        </Navbar.Collapse>
          {isLoggedIn} {
            <Nav.Item as="li">
              {/* <Nav.Link eventKey="link-3" onClick={logOut}>Déconnexion</Nav.Link> */}
            </Nav.Item>
          } : {
            <Nav.Item as="li">
              <Nav.Link eventKey="link-4" href="/login">Connexion</Nav.Link>
            </Nav.Item>
          }
          
        </Nav>
      </div>
  )
}
export default Navigation;

