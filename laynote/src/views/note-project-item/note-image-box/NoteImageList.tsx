/** @jsxImportSource @emotion/react */
import * as s from "./noteImageBoxStyle";
import React, { useRef, useState } from "react";
import { NoteComposition } from "../../../types/dto";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useCompositionStore } from "../../../stores/noteComposition.store";
import axios from "axios";
import {
  COMPOSITION_POSITION_PUT,
  MAIN_APT_PATH,
  NOTE_IMAGE_BOX_LIST_DELETE,
  NOTE_IMAGE_BOX_LIST_PATH,
  NOTE_IMAGE_BOX_PATH,
  NOTE_IMG_BOX_CREATE,
  NOTE_PROJECT_COMPOSITION_PATH,
} from "../../../apis/apis";
import NoteImageBox from "./NoteImageBox";
import { BiPlus } from "react-icons/bi";
import { FaMinus } from "react-icons/fa6";

interface NoteProps {
  noteCompositionId: string;
  data: NoteComposition;
  workspaceRef: React.RefObject<HTMLDivElement | null>;
}

function NoteImageList({ noteCompositionId, data, workspaceRef }: NoteProps) {
  const { compositionX = 100, compositionY = 100, noteImageBoxList } = data;
  const { noteProjectId } = useParams<{ noteProjectId: string }>();
  const { fetchNotes } = useCompositionStore();
  const [cookies] = useCookies(["token"]);
  const [position, setPosition] = useState({
    x: compositionX,
    y: compositionY,
  });

  const frameRef = useRef<number | null>(null);

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (!workspaceRef.current) return;
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;
    const ws = workspaceRef.current;
    const rect = ws.getBoundingClientRect();
    dragging.current = true;
    offset.current = {
      x: e.clientX - rect.left + ws.scrollLeft - position.x,
      y: e.clientY - rect.top + ws.scrollTop - position.y,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current || !workspaceRef.current) return;
    const ws = workspaceRef.current;
    const rect = ws.getBoundingClientRect();
    const x = e.clientX - rect.left + ws.scrollLeft - offset.current.x;
    const y = e.clientY - rect.top + ws.scrollTop - offset.current.y;

    setPosition({
      x: Math.max(0, x),
      y: Math.max(0, y),
    });
  };

  const updatePosition = async (x: number, y: number) => {
    try {
      await axios.put(
        `${MAIN_APT_PATH}${NOTE_PROJECT_COMPOSITION_PATH}/${noteCompositionId}/${noteProjectId}${COMPOSITION_POSITION_PUT}`,
        { compositionX: x, compositionY: y },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        },
      );
      if (!noteProjectId) return;
      fetchNotes(cookies.token, noteProjectId);
    } catch (error) {
      console.error(error);
    }
  };

  const onMouseUp = async () => {
    if (!dragging.current) return;
    dragging.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    await updatePosition(position.x, position.y);
  };

  const deleteImageList = async (noteImageBoxListId: number) => {
    const isConfirm = window.confirm("삭제할까요?");
    if (!isConfirm) return;
    try {
      await axios.delete(
        `${MAIN_APT_PATH}${NOTE_IMAGE_BOX_LIST_PATH}/${noteProjectId}${NOTE_IMAGE_BOX_LIST_DELETE}/${noteImageBoxListId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        },
      );
      if (!noteProjectId) return;
      fetchNotes(cookies.token, noteProjectId);
    } catch (error) {
      console.error(error);
    }
  };

  const createNoteBox = async (noteImageBoxListId: number) => {
    try {
      await axios.post(`${MAIN_APT_PATH}${NOTE_IMAGE_BOX_PATH}/${noteProjectId}${NOTE_IMG_BOX_CREATE}/${noteImageBoxListId}`, {}, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        }, withCredentials: true
      });
      if (!noteProjectId) return;
      fetchNotes(cookies.token, noteProjectId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      style={{ left: position.x, top: position.y }}
      css={s.noteImgListContainer}
      onMouseDown={onMouseDown}
      key={"noteImageBoxList-" + data.noteImageBoxList?.noteImageBoxListId}
    >
      <div css={s.deleteBtnDiv}>
        <FaMinus 
          onClick={() => {
            noteImageBoxList?.noteImageBoxListId &&
              deleteImageList(noteImageBoxList?.noteImageBoxListId);
          }}
        />
      </div>
      {noteImageBoxList?.noteImageBoxDto.map((note) => (
        <div key={note.noteImageBoxId}>
          <NoteImageBox data={note} />
        </div>
      ))}
      <div>
        <BiPlus onClick={()=> {noteImageBoxList?.noteImageBoxListId && createNoteBox(noteImageBoxList?.noteImageBoxListId)}}/>
      </div>
    </div>
  );
}

export default NoteImageList;
