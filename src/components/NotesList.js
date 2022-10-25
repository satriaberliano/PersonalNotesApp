import React from 'react';
import NotesItem from './NotesItem';
import PropTypes from 'prop-types'
import LocaleContext from '../contexts/LocaleContext';

function NotesList({ notes }){
  const { locale } = React.useContext(LocaleContext);

  if(!notes.length){
    return (
      <section className='notes-list-empty'>
        <p className='notes-list__empty'>{ locale === 'id' ? 'Tidak Ada Catatan' : 'No Notes' }</p>
      </section>
    )
  }

  return(
    <section className='notes-list'>
      { 
        notes.map((note) => (
          <NotesItem key={note.id} id={note.id} {...note}/>
        ))
      }
    </section>
  )

}

NotesList.propTypes = {
  notes: PropTypes.array,
}

export default NotesList;