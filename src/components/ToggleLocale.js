import React from 'react';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { MdGTranslate } from 'react-icons/md'

function ToggleLocale(){

  return(
    <LocaleConsumer>
      {({ toggleLocale }) => {
        return <button className='toggle-locale' title='Bahasa' onClick={toggleLocale}>
          <MdGTranslate />
        </button>
      }}
    </LocaleConsumer>
  )
}

export default ToggleLocale;