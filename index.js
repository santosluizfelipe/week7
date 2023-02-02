const NotesModel = require('./notesModel')
const NotesView = require('./notesView');
const NotesClient = require('./notesClient')

const client = new NotesClient();
let model = new NotesModel();
const view = new NotesView(model, client);


model.addNote('your notes gonna show up here');
view.displayNotes();
view.displayNotesFromApi();