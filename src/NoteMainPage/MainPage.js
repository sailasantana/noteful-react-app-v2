import React from 'react';
import Note from '../Note/Note'
import { findFolder, findNote, findNotesForFolder} from '../HelperFuncs'
import NoteContext from '../NoteContext'
import { Link } from "react-router-dom";

export default class MainPage extends React.Component {

    static defaultProps = {
        match : {
            params: {}
        }
    }

    static contextType = NoteContext

    render(){
        let { notes=[]} = this.context
        let { noteID } = this.props.match.params
        let note = findNote(notes, noteID) || {content: 'Hi'}

        console.log(noteID, "id")
        console.log(notes, "notes")
        

        return(
           <div className ="MainPage">
                <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}/>
                <div className = 'content'>
                {note.content.split(/\n\r|\n/).map((paragraph,i) =>
                <p key={i}>{paragraph}</p>)}
                </div>
            </div>






        )
    }
}