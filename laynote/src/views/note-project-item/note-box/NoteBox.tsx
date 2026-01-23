/** @jsxImportSource @emotion/react */
import * as s from "./noteBoxStyle";
import React, { useState } from "react";
import { NoteBoxUpdateRequestDto, NoteComposition } from "../../../types/dto";
import { CiImageOff } from "react-icons/ci";
import { MAIN_APT_PATH, NOTE_BOX_PATH, NOTE_BOX_PUT } from "../../../apis/apis";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useCompositionStore } from "../../../stores/noteComposition.store";

interface NoteProps {
  noteCompositionId: string;
  data: NoteComposition;
}

function NoteBox({ data }: NoteProps) {
  const { noteProjectId } = useParams<{ noteProjectId: string }>();
  const [cookies] = useCookies(["token"]);
  const {
    compositionX = 100,
    compositionY = 100,
    compositionWidth = 350,
    compositionHeight = 400,
    noteBox,
  } = data;
  const [formData, setFormData] = useState<NoteBoxUpdateRequestDto >({
    noteBoxTitle: noteBox?.noteBoxTitle ?? "",
    noteBoxCentent: noteBox?.noteBoxContent ?? "",
    imageUrl: noteBox?.imageUrl ?? ""
  });
  const {fetchNotes} = useCompositionStore();

  const updateNoteBox = async() => {
    try {await axios.put(`${MAIN_APT_PATH}${NOTE_BOX_PATH}/${noteProjectId}${NOTE_BOX_PUT}/${noteBox?.noteBoxId}`, formData, {
      headers: {
        Authorization: `Bearer ${cookies.token}`
      }, withCredentials: true,
    });
    if (!noteProjectId) return;
      fetchNotes(cookies.token, noteProjectId);
    } catch (e) {
      console.error(e);
    }
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    updateNoteBox();
  }

  return (
    <div
      css={s.noteBoxContainer}
      style={{
        left: compositionX,
        top: compositionY,
        width: compositionWidth,
        height: compositionHeight
      }}
    >
      <div css={s.closeDiv}><IoIosClose/></div>
      <input
        css={s.titleInput}
        type="text"
        value={noteBox?.noteBoxTitle ?? ""}
        readOnly
      />
      <div css={s.noteBoxImgDiv}>
        {noteBox?.imageUrl ? (
          <img
            src={`${MAIN_APT_PATH}/${noteBox.imageUrl}`}
            alt=""
            style={{ width: "100%" }}
          />
        ) : (
          <CiImageOff size={50} color="gray" />
        )}
      </div>
      <div css={s.line}></div>
      <textarea css={s.textareaBox} placeholder="내용을 입력해주세요.">{noteBox?.noteBoxContent}</textarea>
    </div>
  );
}

export default NoteBox;
