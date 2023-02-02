class NotesClient{
  loadNotes(callback){
    fetch('http://localhost:3000/notes')
    .then(res => res.json())
    .then(data => {
      callback(data)
    })
  }

  createNote(note){
    const data = { content: note }
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }
}



module.exports = NotesClient;