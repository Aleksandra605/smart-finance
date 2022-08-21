import s from './_header.module.scss';
// import logo from './_logo.module.scss';
import { getIsAuthenticated } from '../../redux/auth/auth-selectors';
import { connect } from 'react-redux';
import UserMenu from './UserMenu';
import Logo from './Logo';

function Header({ isAuthenticated }) {
  return (
    <header className={s.header}>
      <Logo />
      <>{isAuthenticated ? <UserMenu /> : null}</>
    </header>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Header);
