/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('../notesView');
const NotesModel = require('../notesModel');
const NotesClient = require('../notesClient');
require('jest-fetch-mock').enableMocks();


describe('notesView class behavior', () => {
  it('creates a div for each note', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('A first note');
    model.addNote('Another one');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  })

  it('uses input value to create a new note', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const view = new NotesView(model);

    const input = document.querySelector('#add-note')
    input.value = 'new note';
    
    const button = document.querySelector('#add-note-btn')
    button.click();
    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual('new note');
  })

  it('clear the list of previous notes before displaying', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('one');
    model.addNote('two');
  
    view.displayNotes();
    view.displayNotes();
  
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('tests the loadNotes method behavior', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const mockClient = {
      loadNotes: jest.fn(callback => {
        callback(['mock note1', 'mock note2']);
      })
    }
  
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, mockClient);
    
  

    view.displayNotesFromApi();
    expect(mockClient.loadNotes).toHaveBeenCalled();

    const query = document.querySelectorAll('.note');
    expect(query.length).toBe(2);
    expect(query[0].textContent).toBe('mock note1');

  });

  it("should add a note to the database when calling createNote", () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, client);

    //fetch.mockResponseOnce(JSON.stringify("bananas"));

    client.createNote("Mock note");
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/notes",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "Mock note" }),
      })
    );
  });
});