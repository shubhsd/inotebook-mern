import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {
    const context = useContext(noteContext);
    const { notes, fetchNotes } = context;

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div>
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note, index) => {
                    return <NoteItem notes={note} key={index} />;
                })}
            </div>
        </div>
    )
}

export default Notes
