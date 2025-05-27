import { ChangeEvent, useState } from 'react'

import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
    const notesList = [newNote, ...notes]
    setNotes(notesList)
    localStorage.setItem('notes', JSON.stringify(notesList))
  }

  const [search, setSearch] = useState('')

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }

  const filteredSearch =
    search !== ''
      ? notes.filter((note) =>
          note.content.toLowerCase().includes(search.toLowerCase()),
        )
      : notes

  function onNoteDeleted(id: string) {
    const notesList = notes.filter((note) => note.id !== id)
    setNotes(notesList)
    localStorage.setItem('notes', JSON.stringify(notesList))
  }

  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6 px-5">
      <img src={logo} alt="nlw expert" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid auto-rows-[250px] gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredSearch.map((note, index) => (
          <NoteCard key={index} note={note} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </div>
  )
}
