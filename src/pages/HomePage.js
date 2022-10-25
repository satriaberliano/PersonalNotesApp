import React from 'react';
import HomePageAction from '../components/HomePageAction';
import NotesList from '../components/NotesList';
import NotesSearchBar from '../components/NotesSearchBar';
import { useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getActiveNotes } from '../utils/api'
import { LocaleConsumer } from '../contexts/LocaleContext'
import Load from '../components/Load';

function HomePageWrapper(){
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword){
    setSearchParams({keyword});
  }

  return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class HomePage extends React.Component{
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
    const { data } = await getActiveNotes();
    setTimeout(()=>{ 
      this.setState(() => {
        return {
          notes: data,
          load: false,
        }
      })
    },225);
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

    const activeNotes = filteredNotes.filter((note) => note.archived === false);

    if(this.state.load){
      return(
        <Load />
      )
    }

    return(
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <section className='homepage'>
              <h2>{ locale === 'id' ? 'Catatan Aktif' : 'Active Note' }</h2>
              <NotesSearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler}/>
              <NotesList notes={activeNotes}/>
              <HomePageAction />
            </section>
          )
        }}
      </LocaleConsumer>
    )
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired
}
export default HomePageWrapper;