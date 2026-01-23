import React from 'react'
import { useMatch, useParams } from 'react-router-dom';
import NoteProjectBar from './NoteProjectBar';
import NoteProjectDetailBar from './NoteProjectDetailBar';

function SidebarSwitcher() {
  const isNoteProject = useMatch("/note/:noteProjectId");
  
  return (
    <>
      {isNoteProject ? <NoteProjectDetailBar /> : <NoteProjectBar />}
    </>
  )
}

export default SidebarSwitcher