
import React from 'react'
import NoteContext from '../NoteContext'
import { findFolder, findNote, findNotesForFolder} from '../HelperFuncs'
import { Link } from 'react-router-dom'


export default class NoteListNav extends React.Component {
  static contextType = NoteContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNavList'>
          {folders.map(folder =>
            <li key={folder.id}>
              <Link
                className='FolderInNav'
                to={`/folder/${folder.id}`}
              >
                {folder.name}
              </Link>
            </li>
          )}
        </ul>
        <div>
        <Link to='./add-folder'> Add Folder </Link>
        </div>
      </div>
    )
  }
}