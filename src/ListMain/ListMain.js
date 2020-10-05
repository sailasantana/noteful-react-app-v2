import React from 'react';
import { Link } from "react-router-dom";
import NoteContext from '../NoteContext';
import { findFolder, findNote, findNotesForFolder} from '../HelperFuncs';
import Note from '../Note/Note'

export default class ListMain extends React.Component{
   
    static contextType = NoteContext

    static defaultProps = {
        match: {
            params : {}
        }
    }

    render(){
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = findNotesForFolder(notes=[], folderId)
            
        return(
            <div className = 'ListMain'>
                <ul class>
                    {notesForFolder.map(note => 
                        <li key={note.id}>
                            <Note
                            id = {note.id}
                            name={note.name}
                            modified={note.modified}/>
                        </li>)}
                </ul>
                <div className="AddANoteForm">
                    <button tag={Link} to='./add-note' type='button' className='button'>
                        Add A Note
                    </button>
                </div>
            </div>
            



        )
    }
}


