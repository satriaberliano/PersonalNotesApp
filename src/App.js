import React from 'react';
import NotesAppHeader from '../src/components/NotesAppHeader'
import { Routes, Route } from 'react-router-dom'
import ArchivePage from '../src/pages/ArchivePage'
import DetailNotesPageWrapper from './pages/DetailNotesPage';
import AddNotesPage from './pages/AddNotesPage';
import HomePageWrapper from './pages/HomePage';
import PageNotFound404 from './pages/PageNotFound404';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/api';
import { rootPath, notFoundPath, archivesPath, addNotesPath, detailNotePath, registerPath } from './routes'
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext'
import swal from 'sweetalert'

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          }
        })
      },
      locale: localStorage.getItem('locale') || 'id',
      toggleLocale: () => {
        this.setState((prevState) => {
          const newLocale = prevState.locale === 'id' ? 'en' : 'id';
          localStorage.setItem('locale', newLocale);
          return {
            locale : newLocale
          }
        })
      }
    }

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogoutHandler = this.onLogoutHandler.bind(this);
  }

  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
 
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogoutHandler() {
    swal({
      title: 'Keluar Aplikasi',
      text: 'Apa anda yakin ingin keluar?',
      buttons: true,
      dangerMode: true,
    }).then((userLogout) => {
      if(userLogout){
        this.setState(() => {
          return {
            authedUser: null
          }
        });
        putAccessToken('');
      }else{
        return false;
      }
    })
  }

  render(){
    if (this.state.initializing){
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state} >
          <ThemeProvider value={this.state}>
            <div className="app-container">
              <header>
                <NotesAppHeader authedUser={this.state.authedUser}/>
              </header>
            <main>
              <Routes>
                <Route path={notFoundPath} element={<LoginPage loginSuccess={this.onLoginSuccess} />}></Route>
                <Route path={registerPath} element={<RegisterPage />}></Route>
              </Routes>
            </main>
            </div>
          </ThemeProvider>
        </LocaleProvider>
      )
    }

    return(
      <LocaleProvider value={this.state} >
        <ThemeProvider value={this.state}>
          <div className="app-container">
          <header>
            <NotesAppHeader logout={this.onLogoutHandler} name={this.state.authedUser.name}/>
          </header>
          <main>
            <Routes>
              <Route path={notFoundPath} element={<PageNotFound404 />}></Route>
              <Route path={rootPath} element={<HomePageWrapper />}></Route>
              <Route path={archivesPath} element={<ArchivePage />}></Route>
              <Route path={addNotesPath} element={<AddNotesPage />}></Route>
              <Route path={detailNotePath} element={<DetailNotesPageWrapper />}></Route>
            </Routes>
          </main>
          </div>
        </ThemeProvider>
      </LocaleProvider>
    )
  }
}

export default App;
