import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];

    const s1 = {
        "name": "Shubham",
        "class": "5b"
    }

    const [notes, setNotes] = useState(notesInitial);
    const [state, setstate] = useState(s1);

    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "updated name",
                "class": "updated class"
            })
        }, 1000);
    };

    // Get all notes
    const fetchNotes = async () => {
        // API call 
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0OWM5NGQ4MzIwNzNkMjE2Y2JhY2MwIn0sImlhdCI6MTYzMjIyNTYxM30.RVek6uhDVdyKKrrI02jJX-QLHVVy2xrnNhHqWnLLdWA'
            },
        });
        const json = await response.json();
        setNotes(json);
    };

    // Add a note
    const addNote = async (title, description, tag) => {

        // API call 
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0OWM5NGQ4MzIwNzNkMjE2Y2JhY2MwIn0sImlhdCI6MTYzMjIyNTYxM30.RVek6uhDVdyKKrrI02jJX-QLHVVy2xrnNhHqWnLLdWA'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();


        const note = {
            "_id": "6149e4ac86a62a078cee5152",
            "user": "6149c94d832073d216cbacc0",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-21T13:57:00.733Z",
            "__v": 0
        };

        // concat returns an array whereas push updates an array so we can't use push like we have done below
        // setNotes(notes.push(note));  //we cannot do this

        setNotes(notes.concat(note));
    };

    // Delete a note
    const deleteNote = (id) => {
        console.log('deleting a note with id' + id);
        const newNotes = notes.filter((note) => {
            return note._id !== id;
            // Means if note._id is not equal to id to be deleted then only it will remain in this array.
        });
        setNotes(newNotes);
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {

        // API call 
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0OWM5NGQ4MzIwNzNkMjE2Y2JhY2MwIn0sImlhdCI6MTYzMjIyNTYxM30.RVek6uhDVdyKKrrI02jJX-QLHVVy2xrnNhHqWnLLdWA'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        // Logic to edit in client

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    };

    return (
        <NoteContext.Provider value={{ notes, fetchNotes, setNotes, addNote, deleteNote, editNote, state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;