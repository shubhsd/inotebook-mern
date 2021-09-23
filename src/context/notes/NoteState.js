import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

    const s1 = {
        "name": "Shubham",
        "class": "5b"
    }

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
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;