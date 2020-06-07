import React, { Component, Fragment } from 'react';
import { 
    Collapse, 
    Navbar,
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    NavLink,
    Container 
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AppNavbar extends Component {
    //we can also have a contructor which binds this class to the self declared methods like toggle 
    state = { //current state of the navbr components
        isOpen: false
    };

    toggle = () => { //if we did not bind, then we can use an arrow method
        this.setState({ //flips state
            isOpen: !this.state.isOpen
        });
    }

    render() { //this method renders the component
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}`: '' }</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );
        return (
            <Navbar color="dark" className="mb-5" expand="sm" dark>
                <Container>
                    <NavbarBrand href="/">
                        Shopping List
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="http://sufianmushtaq.com/">Website</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/sufian27">Github</NavLink>
                            </NavItem>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(AppNavbar);