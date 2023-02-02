class NotesView {
  constructor(model, client) {
    this.client = client;
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');

    document.querySelector('#add-note-btn').addEventListener('click',() => {
      const newNote = document.querySelector('#add-note').value;
      this.addNewNote(newNote);
    })
  }

  addNewNote(newNote) {
    this.model.addNote(newNote);
    this.displayNotes();
  }
  
  
  displayNotes() {
    document.querySelectorAll('.note').forEach(elem => {
      elem.remove();
    })
    const notes = this.model.getNotes()

    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);

      document.querySelector('#add-note').value = '';
    })
  }

  displayNotesFromApi(){
    this.client.loadNotes((notes) => {
      this.model.setNotes(notes)
      this.displayNotes()
    })
  }
}

module.exports = NotesView;