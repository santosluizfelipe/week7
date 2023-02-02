const Model = require('../notesModel')

describe('notes model', () => {
  it('initializes with an empty array', () => {
    let todoList = new Model();

    expect(todoList.getNotes()).toEqual([])
  })

  it('adds new todos', () => {
    let todoList = new Model();
    todoList.addNote('Buy milk')
    todoList.addNote('Go to the gym')

    expect(todoList.getNotes()).toEqual(['Buy milk', 'Go to the gym'])
  })

  it('it resets all todos', () => {
    let todoList = new Model();
    todoList.addNote('Buy milk')
    todoList.addNote('Go to the gym')
    todoList.reset()

    expect(todoList.getNotes()).toEqual([])
  })
})