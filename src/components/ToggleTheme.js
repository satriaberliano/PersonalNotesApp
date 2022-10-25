import React from 'react';
import { ThemeConsumer } from '../contexts/ThemeContext';
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

function ToggleTheme(){

  return(
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return <button className='toggle-theme' title='Tema' onClick={toggleTheme}>
          {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
        </button>
      }}
    </ThemeConsumer>
  )
}

export default ToggleTheme;