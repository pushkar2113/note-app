 
import { useState } from 'react';

type Note = { title: string, starred: boolean, id: string ,deleteNote:(id:string)=>void };

function NoteCard(props: Note) {
  const [starred, setStarred] = useState(false);
  return <p>{props.title}
    < button onClick={() => setStarred(!starred)} >
    
    {starred ? '  ★' : '  ☆'}
    </button> 
    <button onClick={() => {
       props.deleteNote(props.id);
    }}>Delete</button>
  </p >
}


function App() {

  
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState('');

  function addNote() {
    if (text.trim() === '') return;
    const id = Date.now().toString();
    setNotes([{ title: text.trim(), starred: false, id, deleteNote: (id) => deleteNote(id) }, ...notes]);
    setText('');
  }

  function deleteNote(id: string) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div>
      <h1>My Notes</h1>
      <input type = 'text' value={text} placeholder="Add a new note" onChange= {(e)=>{setText(e.target.value)}} ></input>
      <button onClick={addNote}>Add Note</button>
      {notes.map((note,index) => <NoteCard key={index} title={note.title} id={note.id} starred={note.starred} deleteNote={deleteNote} />)}
    </div>);
}
      



export default App