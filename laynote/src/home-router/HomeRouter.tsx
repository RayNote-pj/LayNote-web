import React from 'react'
import userAuthStore from '../stores/user.store';
import NoteProjectList from '../views/note-project/NoteProjectList';
import WelcomePage from '../views/welcome-page/WelcomePage';

function HomeRouter() {
  const { isAuthenticated } = userAuthStore();
  return isAuthenticated ? <NoteProjectList /> : <WelcomePage />;
}

export default HomeRouter