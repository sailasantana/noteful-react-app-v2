import React from 'react';
import './App.css';

import {Route, Link} from 'react-router-dom'
import ListMain from '../ListMain/ListMain'
import ListNav from '../ListNav/ListNav'
import AddFolder from '../Add/AddFolder'
import AddNote from '../Add/AddNote'
import Note from '../Note/Note'
import MainPage from '../NoteMainPage/MainPage'
import NotePageNav from '../NotePageNav/NotePageNav'
import Dummy from '../DummyStore'
import Endpoint from '../endpoint'
import { findFolder, findNote, findNotesForFolder} from '../HelperFuncs'
import NoteContext from '../NoteContext'
 



export default class App extends React.Component{

  state = {
    notes :[],
    folder : []
  }

  componentDidMount() {
    Promise.all([
      fetch(`${Endpoint.ApiEndpoint}/notes`),
      fetch(`${Endpoint.ApiEndpoint}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        console.log(notes)
        console.log(folders)
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }


  //handleAddFolder = folder => {
    //this.setState({
      //folders: [
        //...this.state.folders,
        //folder
      //]
    //})
  //}

  //handleAddNote = note => {
    //this.setState({
      //notes: [
        //...this.state.notes,
        //note
      //]})}

  //handleDeleteNote = noteId => {
    //this.setState({
      //notes: this.state.notes.filter(note => note.id !== noteId)
    //})
  //}



  renderNavRoutes(){
    return(
     <>
      {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component= {ListNav}                      
          />
        ))}
         <Route
        path ='./note/noteId'
        component={NotePageNav} 
       />
        <Route
        path ='/add-folder'
        component= {NotePageNav}/>
        <Route
        path= '/add-note'
        component={NotePageNav}/>
     
     </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={ListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          component={MainPage}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  render(){
    const contextValues = {
      folders : this.state.folders,
      notes : this.state.notes

    };
    return (
      <NoteContext.Provider value={ contextValues } >
        <div className="App">
        <nav className="App_nav">{this.renderNavRoutes()}</nav>
        <header className="App-header">
          <h1>
            <Link to="/">Noteful</Link>{' '}
          </h1>
        </header>
        <main className="App_main">{this.renderMainRoutes()}</main>
      </div>
      </NoteContext.Provider>
      
    );
  }
}
