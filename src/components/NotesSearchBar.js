import React from 'react';
import PropTypes from 'prop-types'
import LocaleContext from '../contexts/LocaleContext';

function NotesSearchBar({ keyword, keywordChange }){
  const { locale } = React.useContext(LocaleContext);

  return(
    <section className='search-bar'>
      <input 
      type='text' 
      placeholder={locale === 'id' ? 'Cari berdasarkan judul ...' : 'Search by title ...'} 
      value={keyword}
      onChange={(event) => keywordChange(event.target.value)} />
    </section>
  )
}

NotesSearchBar.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired
}

export default NotesSearchBar;