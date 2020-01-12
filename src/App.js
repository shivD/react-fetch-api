import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  ListGroup,
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown
} from "react-bootstrap";
function App() {
  const menuItems = [
    {
      name: "home",
      link: "home",
      sub: []
    },
    {
      name: "submenu",
      link: "submenu",
      sub: [
        { name: "submenu1", link: "submenu1" },
        { name: "submenu2", link: "submenu2" }
      ]
    }
  ];
 const initialState=[];
  const [ error, Seterror ] = useState(null);
  const [ isLoaded, SetisLoaded ] = useState(false);
  const [ limit, Setlimit ] = useState(5);
  const [ items, Setitems ] = useState(initialState);
  const [ title, Settitle ] = useState('Navbar');
  
 console.log('meggage', error);
function loadMore(val) {
  Setlimit(limit + val)
}

useEffect(() => {
  axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
    Setitems(res.data);
    SetisLoaded(true)
  });
},[]);


return (
  <>

    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">{title}</Navbar.Brand>
      <Nav className="mr-auto">
        {menuItems.map(menu => (
          <React.Fragment>
            {menu.name !== "" ? (
              <React.Fragment>
                {menu.sub.length ? (
                  <NavDropdown
                    title={menu.name}
                    id="collasible-nav-dropdown">
                    {menu.sub.map(submenu => (
                      <NavDropdown.Item href="#action/3.1">
                        {submenu.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                    <Nav.Link href="#home">{menu.name}</Nav.Link>
                  )}
              </React.Fragment>
            ) : (
                <>Please add Menu</>
              )}
          </React.Fragment>
        ))}
      </Nav>
    </Navbar>
    {error ? (<div>Error: {error.message}</div>) : (
      <>
        {!isLoaded ? (<div className="d-block mx-auto mt-5">Loading...</div>) : (

          <Container>
            <ListGroup as="ul">
              {items.slice(0, limit).map((item, index) => (
                <ListGroup.Item as="li" key={item.name}>
                  {item.name} {item.price}
                </ListGroup.Item>
              ))}
            </ListGroup>

            {limit < items.length && (
              <Button variant="outline-primary" onClick={() => loadMore(2)}>
                Load MOre
               </Button>
            )}
          </Container>
        )}
      </>)}

  </>
)
  
}
App.propTypes = {
  limit: PropTypes.number,
  title: PropTypes.string.isRequired
}

App.defaultProps = {

}
export default App;
