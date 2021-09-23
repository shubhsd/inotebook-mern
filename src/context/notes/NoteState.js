import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "6149e49c86a62a078cee514f",
            "user": "6149c94d832073d216cbacc0",
            "title": "Test1",
            "description": "This is test note 1 description",
            "tag": "reminder",
            "date": "2021-09-21T13:56:44.995Z",
            "__v": 0
        },
        {
            "_id": "6149e4ac86a62a078cee5152",
            "user": "6149c94d832073d216cbacc0",
            "title": "Test2",
            "description": "This is test note 2 description",
            "tag": "reminder",
            "date": "2021-09-21T13:57:00.733Z",
            "__v": 0
        },
        {
            "_id": "6149e49c86a62a078cee514f",
            "user": "6149c94d832073d216cbacc0",
            "title": "Test1",
            "description": "This is test note 1 description",
            "tag": "reminder",
            "date": "2021-09-21T13:56:44.995Z",
            "__v": 0
        },
        {
            "_id": "6149e4ac86a62a078cee5152",
            "user": "6149c94d832073d216cbacc0",
            "title": "Test2",
            "description": "This is test note 2 description",
            "tag": "reminder",
            "date": "2021-09-21T13:57:00.733Z",
            "__v": 0
        },
        {
            "_id": "6149e49c86a62a078cee514f",
            "user": "6149c94d832073d216cbacc0",
            "title": "Test1",
            "description": "This is test note 1 description",
            "tag": "reminder",
            "date": "2021-09-21T13:56:44.995Z",
            "__v": 0
        },
        {
            "_id": "6149e4ac86a62a078cee5152",
            "user": "6149c94d832073d216cbacc0",
            "title": "Test2",
            "description": "This is test note 2 description",
            "tag": "reminder",
            "date": "2021-09-21T13:57:00.733Z",
            "__v": 0
        }
    ]

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

    // Add a note
    const addNote = (title, description, tag) => {
        // TODO : Api call
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
    const editNote = (id, title, description, tag) => {

    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;