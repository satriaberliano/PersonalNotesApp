import React from 'react';
import NotesSearchBar from '../components/NotesSearchBar';
import NotesList from '../components/NotesList';
import PropTypes from 'prop-types';
import { getArchivedNotes } from '../utils/api';
import { useSearchParams } from 'react-router-dom';
import { LocaleConsumer } from '../contexts/LocaleContext';
import Load from '../components/Load';

function ArchivePageWrapper(){
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword){
    setSearchParams({keyword});
  }

  return <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class ArchivePage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || '',
      load: true,
    }

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount(){
    const { data } = await getArchivedNotes();
    setTimeout(()=>{
      this.setState(() => {
        return {
          notes: data,
          load: false,
        }
      })
    },225)
    
  }

  onKeywordChangeHandler(keyword){
    this.setState(() => {
      return {
        keyword
      }
    })

    this.props.keywordChange(keyword);
  }

  render(){
    const filteredNotes = this.state.notes.filter((note) => {
      return note.title.toLowerCase().includes(
        this.state.keyword.toLowerCase()
      );
    });

    const archivedNotes = filteredNotes.filter((note) => note.archived === true);

    if(this.state.load){
      return(
        <Load />
      )
    }

    return(
      <LocaleConsumer>
        {({locale}) => {
          return(
            <section className='archives-page'>
              <h2>{ locale === 'id' ? 'Catatan Arsip' : 'Archived Note' }</h2>
              <NotesSearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler}/>
              <NotesList notes={archivedNotes}/>
            </section>
          )
        }}
      </LocaleConsumer>
    )
  }
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
}

export default ArchivePageWrapper;