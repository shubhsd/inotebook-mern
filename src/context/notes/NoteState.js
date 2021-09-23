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

    const [notes, setnotes] = useState(notesInitial);
    const [state, setstate] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "updated name",
                "class": "updated class"
            })
        }, 1000);
    };
    return (
        <NoteContext.Provider value={{ notes, setnotes, state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;