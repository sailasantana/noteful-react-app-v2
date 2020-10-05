import React from 'react';
import NotefulContext from '../NotefulContext';
import Endpoint from '../endpoint';


export default class AddFolder extends React.Component{


    static contextType = NotefulContext

    static defaultProps = {
        history : {
            push:() => {}
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        const folder = {
            name: e.target['folder-name'].val()
        }

        fetch(`${Endpoint.ApiEndpoint/folder}`,
        {
        method: POST,
        headers: {
            'content-type': 'application/json'    
        }

        })
        .then (response => {
            if (!response.ok){
                return(response.json().then(e => Promise.reject(e)))
            }
            return response.json()
        })
        .then (folder => {
            this.context.addFolder(folder)
            this.props.history.push(`/folders/${folder.id}`)
        })
        .catch(err =>
            alert({err}))
    }

    render(){

        return(
            <div>
                <h2>Create A New Folder</h2>
                <form>
                    <label>Name</label>
                    <input type = 'text' name= 'folder-name'/>
                </form>
                <button type='submit'>
                    Add Folder
                </button>
            </div>

        )
    }

    
    }



  
