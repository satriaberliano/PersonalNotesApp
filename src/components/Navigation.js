import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { TbLogout } from 'react-icons/tb'
import ToggleTheme from './ToggleTheme';
import ToggleLocale from './ToggleLocale';
import LocaleContext from '../contexts/LocaleContext';

function Navigation({authedUser, logout, name}){
  const { locale } = React.useContext(LocaleContext);
  if (authedUser === null) {
    return(
      <>
        <ToggleLocale />
        <ToggleTheme />
      </>
    )
  }

  return(
    <>
        <nav className='navigation'>
          <ul>
            <li>
              <Link to='/archives'> { locale === 'id' ? 'Arsip' : 'Archived' } </Link>
            </li>
          </ul>
        </nav>
        <ToggleLocale />
        <ToggleTheme />
        <button className='button-logout' type='button' title='Keluar' onClick={logout}>
        <TbLogout />{name}
        </button>
    </>

  )
}

Navigation.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
  authedUser: PropTypes.array,
};

export default Navigation;