import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react"
import { Container } from "react-bootstrap"
import {Routes, Route, Navigate} from 'react-router-dom'
import { NewNote } from "./NewNote"
import { UpdateNote } from "./UpdateNote"
import { useLocalStorage } from "./useLocalStorage"

export type Note = {
  id: string
}& NoteData
export type RawNote ={
  id: string
}& RawNoteData

export type RawNoteData ={
  title:string,
  markdown:string,
  tagIds: string[],
}

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}
export type Tag={
  id:string,
  label: string,
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(()=>{
    return notes.map(note =>{
      return {...note, tag: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  },[notes, tags])


  return (
    <Container className="my-4">
      <Routes>
        <Route path = "/" element={<h1>Hello</h1>}/>
        <Route path="/new" element={<NewNote />} />
          <Route path="/:id">
            <Route index element={<h1>SHOW</h1>} />
            <Route path="edit" element={<UpdateNote />} />
          </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
