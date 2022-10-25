import React from 'react';
import Navigation from './Navigation';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { LocaleConsumer } from '../contexts/LocaleContext'

function NotesAppHeader({authedUser, logout, name}){
  return(
    <>
      <LocaleConsumer>
        {({locale}) => {
        return (
          <>
            <h1>
              <Link to='/'>{ locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
            </h1>
            <Navigation authedUser={authedUser} logout={logout} name={name}/>
          </>
        )
      }}
      
      </LocaleConsumer>
    </>
  )
}

NotesAppHeader.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
  authedUser: PropTypes.array,
}

export default NotesAppHeader;