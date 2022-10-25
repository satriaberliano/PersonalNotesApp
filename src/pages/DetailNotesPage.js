import React from 'react';
import NotesDetail from '../components/NotesDetail';
import PropTypes from 'prop-types'
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/api'
import { useParams, useNavigate } from 'react-router-dom'
import PageNotFound404 from './PageNotFound404';
import Load from '../components/Load';
import swal from 'sweetalert'

function DetailNotesPageWrapper(){
  const { id } = useParams();
  const navigate = useNavigate();
  return <DetailNotesPage navigate={navigate} id={id}/>
}

class DetailNotesPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      notes: '',
      load: true,
    }

    this.onDeleteNotesHandler = this.onDeleteNotesHandler.bind(this);
    this.onArchiveNotesHandler = this.onArchiveNotesHandler.bind(this);
    this.onUnarchiveNotesHandler = this.onUnarchiveNotesHandler.bind(this);
  }

  async componentDidMount(){
    const { data } = await getNote(this.props.id);
    setTimeout(()=>{
      this.setState(()=>{
        return {
          notes: data,
          load: false,
        }
      })
    }, 225)
  }

  async onDeleteNotesHandler(id){
    await deleteNote(id);
    swal('Catatan Dihapus', {button:false});
    this.props.navigate('/');
  }

  async onArchiveNotesHandler(id) {
    await archiveNote(id);
    this.props.navigate('/');
  }

  async onUnarchiveNotesHandler(id) {
    await unarchiveNote(id);
    this.props.navigate('/archives');
  }

  render(){
    if(this.state.load){
      return(
        <Load />
      )
    }

    if (this.state.notes === ''){
      return <p>Catatan tidak ditemukan</p>
    }

    if (this.state.notes === null){
      return <PageNotFound404 />
    }

    return (
      <>
        <NotesDetail
          onDelete={this.onDeleteNotesHandler}
          onArchive={this.onArchiveNotesHandler}
          onUnarchive={this.onUnarchiveNotesHandler}
          {...this.state.notes} />
      </>
    )
  }
}

DetailNotesPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,    
}
export default DetailNotesPageWrapper;