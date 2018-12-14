import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
    } from 'reactstrap';

export default class Navigation extends React.Component {
    render() {
        return (
            <div>
                <Navbar color="dark"  expand="sm">
                    <NavbarBrand  href="/">Flask Dropbox</NavbarBrand>
                    <Collapse navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href='/about'>About</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    GitHub
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavLink  href="https://github.com/Meathookseed/dropbox_flask">GitHub Backend</NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink href = 'https://github.com/Meathookseed/dropbox_react'>GitHub Frontend</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}