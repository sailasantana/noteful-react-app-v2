
import React from 'react'
import {Route, Link} from 'react-router-dom'
import NoteContext from '../NoteContext'
import { findFolder, findNote, findNotesForFolder} from '../HelperFuncs'
import Note from '../Note/Note'

export default class MainPage extends React.Component {

    static contextType = NoteContext


    static defaultProps = {
        match: {
            params : {}
        }
    }


    render(){
        
        let { noteId } = this.props.match.params
        let { notes=[]} = this.context
        let mainNote = findNote(notes, noteId) || {content: 'Hi'}
        
        console.log(notes)

        //console.log(this.props,'params')

        //console.log(noteId,'id')
        

        return(
           <div className ="MainPage">
                <Note
                    id={mainNote.id}
                    name={mainNote.name}
                    modified={mainNote.modified}/>
                <div className = 'content'>
                {mainNote.content.split(/\n\r|\n/).map((paragraph,i) =>
                <p key={i}>{paragraph}</p>)}
                </div>
            </div>






        )
    }
}