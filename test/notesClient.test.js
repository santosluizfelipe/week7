const NotesClient = require('../notesClient');
require('jest-fetch-mock').enableMocks()

describe('notes client behavior', () => {
  it('loadnotes method', () => {
    let notesClient = new NotesClient();
    fetch.mockResponse(JSON.stringify(
      ['note1', 'note2']
    ))
    notesClient.loadNotes((data) => {
      expect(data).toEqual(['note1', 'note2'])
    })
  })
})