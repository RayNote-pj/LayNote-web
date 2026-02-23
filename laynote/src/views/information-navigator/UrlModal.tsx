import React from 'react'
import { useMatch } from 'react-router-dom';

function UrlModal() {
  const match = useMatch("/note/:noteProjectId/*");
  const noteProjectId = match?.params.noteProjectId;

  return (
    <div>
      <input type="text" readOnly defaultValue={`http://localhost:3000/note/${noteProjectId}`}/>
    </div>
  )
}

export default UrlModal