import React from 'react'

const NoteItem = (props) => {
    const { notes } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text"> {notes.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur vitae ipsum iure aperiam? Nihil, porro maiores. Odio, nostrum quod. Amet odio architecto temporibus maiores. Non dolores doloribus iusto porro perferendis.</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem

