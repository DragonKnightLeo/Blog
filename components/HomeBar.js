import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const HomeBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <Navbar color="black" light expand="md">
        <Link href="/">
          <NavLink id="navitem">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
              <NavItem>
                <Link href="/blogs">
                  <NavLink id="navitem-blogs">Blogs</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="">
                  <NavLink id="navitem">Contact</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>



            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink id="navitem">{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink id="navitem">{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default HomeBar;
