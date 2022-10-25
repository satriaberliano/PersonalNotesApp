import React from 'react';
import NotesInput from '../components/NotesInput';
import { addNote } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'

function AddNotesPage(){
  const navigate = useNavigate();

  async function onAddNotesHandler(notes){
    await addNote(notes);
    swal({
      title: 'Catatan berhasil dibuat',
    })
    navigate('/');
  }

  return(
    <NotesInput addNote={onAddNotesHandler}/>
  )
}

export default AddNotesPage;