/** @jsxImportSource @emotion/react */
import * as s from "./noteProjectListStyle";
import React, { useEffect, useState } from 'react'
import { NoteProjectDto } from '../../types/dto';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { MAIN_APT_PATH, NOTE_PROJECT_ALL, NOTE_PROJECT_PATH } from '../../apis/apis';

function NoteProjectList() {
  const [noteData, setNoteData] = useState<NoteProjectDto[]>([]);
  const [cookies] = useCookies(["token"]);

  const fetchData = async() => {
    try{
      const response = await axios.get(`${MAIN_APT_PATH}${NOTE_PROJECT_PATH}${NOTE_PROJECT_ALL}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );
      setNoteData(response.data.data.noteProjects);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div css={s.barBackground}>
      {noteData.map(note => (
        <div key={note.noteProjectId}>
          <div>
            <img src={note.noteProjectImageUrl} alt={note.noteProjectImageUrl} />
          </div>
          <div>
            <span>{note.noteProjectTitle}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NoteProjectList