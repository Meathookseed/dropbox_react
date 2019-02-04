import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import {withRouter, Link} from "react-router-dom";

class NavBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isAuthorized: !!localStorage.getItem('token'),
            hidden: true
        };
    }
    componentDidMount() {
        if (this.state.isAuthorized){
            this.setState({hidden:false})
        }
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    };

    render() {
            return (
                <div>
                    <Navbar color="dark"  expand="sm" fixed='top'>
                        <NavbarBrand style={{fontSize:'30px'}}>
                            <Link className='nav-link btn-link' to='/'>
                                Flask Dropbox
                            </Link>
                        </NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem style={{fontSize:'20px'}}>
                                <Link to='/register' className='nav-link btn-link'  hidden={!this.state.hidden} >
                                    Register
                                </Link>
                            </NavItem>
                            <NavItem style={{fontSize:'20px'}}>
                                <Link to='/login' className='nav-link btn-link' hidden={!this.state.hidden} >
                                    Login
                                </Link>
                            </NavItem>
                            <NavItem style={{fontSize:'20px'}}>
                                <Link to='/login' className='nav-link btn-link' onClick={this.handleLogout} hidden={this.state.hidden}>
                                    Logout
                                </Link>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
            );
    }
}

export default withRouter(NavBar)