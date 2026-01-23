/** @jsxImportSource @emotion/react */
import * as s from "./noteProjectDetailStyle";
import React, { useEffect, useState } from "react";
import { NoteProjectDto } from "../../types/dto";
import axios from "axios";
import { IMG_PATH, MAIN_APT_PATH, NOTE_PROJECT_PATH } from "../../apis/apis";
import { useCookies } from "react-cookie";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BiImages } from "react-icons/bi";
import { FaListCheck } from "react-icons/fa6";
import { useMatch } from "react-router-dom";
import { useCompositionStore } from "../../stores/noteComposition.store";
import { CiImageOff } from "react-icons/ci";

function NoteProjectDetailBar() {
  const match = useMatch("/note/:noteProjectId");
  const noteProjectId = match?.params.noteProjectId;
  const [cookies] = useCookies(["token"]);
  const [noteData, setNoteData] = useState<NoteProjectDto | null>(null);
  const { fetchNotes, noteBoxCreate, noteListCreate, noteImgBoxCreate } =
    useCompositionStore();

  const noteProjectData = async () => {
    try {
      const response = await axios.get(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PATH}/${noteProjectId}`,
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
  };

  useEffect(() => {
    noteProjectData();
    if (!noteProjectId) return;
    fetchNotes(cookies.token, noteProjectId);
  }, [noteBoxCreate, noteImgBoxCreate, noteListCreate]);

  return (
    <div css={s.barContainer}>
      <div css={s.imgTitleDiv}>
        <div css={s.noteProjectImgDiv}>
          {noteData?.noteProjectImageUrl ? 
            <img
              css={s.noteProjectImg}
              src={`${IMG_PATH}/${noteData?.noteProjectImageUrl}`}
              alt={noteData?.noteProjectImageUrl}
            />
          :
            <CiImageOff size={20} color="gray"/>
          }
        </div>
        <span css={s.projectTitleSpan}>{noteData?.noteProjectTitle}</span>
        <div css={s.noteProjectDetailBarLine}></div>
      </div>

      <div css={s.noteItemCreateBtnDiv}>
        <button
          css={s.noteItemCreateBtn}
          onClick={() => {
            noteProjectId && noteBoxCreate(cookies.token, noteProjectId);
          }}
        >
          <AiOutlineFileAdd />
        </button>
        <button
          css={s.noteItemCreateBtn}
          onClick={() => {
            noteProjectId && noteImgBoxCreate(cookies.token, noteProjectId);
          }}
        >
          <BiImages />
        </button>
        <button
          css={s.noteItemCreateBtn}
          onClick={() => {
            noteProjectId && noteListCreate(cookies.token, noteProjectId);
          }}
        >
          <FaListCheck />
        </button>
      </div>
    </div>
  );
}

export default NoteProjectDetailBar;
