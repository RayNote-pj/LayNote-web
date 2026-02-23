import React from 'react'
import { useMatch, useParams } from 'react-router-dom';
import NoteProjectBar from './NoteProjectBar';
import NoteProjectDetailBar from './NoteProjectDetailBar';
import userAuthStore from '../../stores/user.store';

function SidebarSwitcher() {
  const { isAuthenticated } = userAuthStore();
  const isNoteProject = useMatch("/note/:noteProjectId");
  if (!isAuthenticated) return null;
  return (
    <>
      {isNoteProject ? <NoteProjectDetailBar /> : <NoteProjectBar />}
    </>
  )
}

export default SidebarSwitcher