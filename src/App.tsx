 
import { useState, useEffect } from 'react';

type Note = { title: string, starred: boolean, id: string};

type NoteCardProps = {
  note: Note,
  onDelete: (id: string) => void,
  onStar: (id: string) => void
}

function NoteCard(props: NoteCardProps) {
  
  return <p>{props.note.title}
    < button onClick={() => {
      props.onStar(props.note.id);
    }} >
    
    {props.note.starred ? '  ★' : '  ☆'}
    </button> 
    <button onClick={() => {
       props.onDelete(props.note.id);
    }}>Delete</button>
  </p >
}


function App() {

  
  
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  });
  const [text, setText] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    if (text.trim() === '') return;
    const id = Date.now().toString();
    setNotes([{ title: text.trim(), starred: false, id }, ...notes]);
    setText('');
    
  }

  function deleteNote(id: string) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }


  function starNote(id: string){
    setNotes(notes.map((note) => {
      if(note.id === id){
        return {...note, starred: !note.starred};
      }
      return note;
    }));
  }

  return (
    <div>
      <h1>My Notes</h1>
      <input type = 'text' value={text} placeholder="Add a new note" onChange= {(e)=>{setText(e.target.value)}} ></input>
      <button onClick={addNote}>Add Note</button>
      {notes.map((note) => <NoteCard key={note.id} note={note} onDelete={deleteNote} onStar={starNote}  />)}
    </div>);
}
      



export default App