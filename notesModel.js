class NotesModel{
  constructor(){
    this.todos = [];
  };

  getNotes(){
    return this.todos;
  };

  addNote(note){
    this.todos.push(note);
  }

  reset(){
    this.todos = []
  }

  setNotes(arr){
    this.todos = arr
  }
};

module.exports = NotesModel;