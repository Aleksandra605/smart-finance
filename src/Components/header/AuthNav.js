import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './_header.module.scss';

const AuthNav = () => (
  <>
    <div className={s.authContainer}>
      <NavLink to="/signup" className={s.authNavLink}>
        SignUp
      </NavLink>

      <NavLink to="/login" className={s.authNavLink}>
        Login
      </NavLink>
    </div>
  </>
);

export default AuthNav;
