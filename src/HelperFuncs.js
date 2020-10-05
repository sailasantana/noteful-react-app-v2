//function to match up user folderID input with what's in DummyStore.js
export  const findFolder = (folders=[], folderID) =>
folders.find(folder => folder.id === folderID)

//function that does the same thing as findFodler but for notes
export  const findNote = (notes=[],noteID) =>
notes.find(note => note.id === noteID)

//function that retrieves notes associated with a particular folderID
export  const findNotesForFolder = (notes=[], folderID) =>
(   //if not = user given folderID then return all notes else filter out a new array
    //of notes that have the same id as the folder input
    (!folderID)
       ? notes
       : notes.filter(note => note.id === folderID)

)





