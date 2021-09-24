import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const { notes, updateNote } = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-lg-between">
                        <h5 className="card-title my-1">{notes.title}</h5>
                        <div>
                            <i className="far fa-trash-alt mx-2" onClick={() => deleteNote(notes._id)}></i>
                            <i className="far fa-edit mx-2" onClick={() => updateNote(notes)}></i>
                        </div>
                    </div>
                    <p className="card-text"> {notes.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem

