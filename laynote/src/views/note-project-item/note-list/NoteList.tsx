/** @jsxImportSource @emotion/react */
import * as s from "./noteListStyle";
import React, { useEffect, useRef, useState } from "react";
import { NoteComposition } from "../../../types/dto";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useCompositionStore } from "../../../stores/noteComposition.store";
import axios from "axios";
import {
  COMPOSITION_POSITION_PUT,
  MAIN_APT_PATH,
  NOTE_LIST_DELETE,
  NOTE_LIST_ITEM_CREATE,
  NOTE_LIST_ITEM_PATH,
  NOTE_LIST_ITEM_UPDATE,
  NOTE_LIST_PATH,
  NOTE_LIST_UPDATE,
  NOTE_PROJECT_COMPOSITION_PATH,
} from "../../../apis/apis";
import NoteListItem from "./NoteListItem";
import { FaMinus } from "react-icons/fa6";
import { BiPlus } from "react-icons/bi";

interface NoteProps {
  noteCompositionId: string;
  data: NoteComposition;
  workspaceRef: React.RefObject<HTMLDivElement | null>;
}

function NoteList({ noteCompositionId, data, workspaceRef }: NoteProps) {
  const {
    compositionX = data.compositionX,
    compositionY = data.compositionY,
    noteList,
  } = data;
  const { noteProjectId } = useParams<{ noteProjectId: string }>();
  const [cookies] = useCookies(["token"]);
  const { fetchNotes } = useCompositionStore();
  const [position, setPosition] = useState({
    x: compositionX,
    y: compositionY,
  });
  const frameRef = useRef<number | null>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const [title, setTitle] = useState(noteList?.noteListTitle ?? "");

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

  const deleteList = async (noteListId: number) => {
    window.confirm("삭제하시겠습니까?")
    try {
      await axios.delete(
        `${MAIN_APT_PATH}${NOTE_LIST_PATH}/${noteProjectId}${NOTE_LIST_DELETE}/${noteListId}`,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        },
      );
      fetchNotes(cookies.token, noteProjectId ?? "");
    } catch (error) {
      console.error(error);
    }
  };

  const createItem = async (noteListId: number) => {
    try {
      await axios.post(
        `${MAIN_APT_PATH}${NOTE_LIST_ITEM_PATH}/${noteProjectId}${NOTE_LIST_ITEM_CREATE}/${noteListId}`,
        {},
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        },
      );
      fetchNotes(cookies.token, noteProjectId ?? "");
    } catch (error) {
      console.error(error);
    }
  };

  const updateTitle = async () => {
    console.log(title);
    try {
      await axios.put(
        `${MAIN_APT_PATH}${NOTE_LIST_PATH}/${noteProjectId}${NOTE_LIST_UPDATE}/${noteList?.noteListId}`,
        { noteListTitle: title },
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && e.ctrlKey) {
      updateTitle();
    }
  };

    useEffect(() => {
      setTitle(noteList?.noteListTitle ?? "");
    }, [noteList?.noteListTitle]);
  
    useEffect(() => {
      if (title === noteList?.noteListTitle) return;
  
      const timer = setTimeout(() => {
        updateTitle();
      }, 500);
  
      return () => clearTimeout(timer);
    }, [title]);

  useEffect(() => {
    setPosition({
      x: compositionX,
      y: compositionY,
    });
  }, [compositionX, compositionY]);

  return (
    <div
      key={"noteList" + noteList?.noteListId}
      css={s.noteListContainer}
      style={{ left: position.x, top: position.y }}
      onMouseDown={onMouseDown}
    >
      <div css={s.listDeleteBtn}>
        <FaMinus cursor={"pointer"} onClick={() => deleteList(noteList?.noteListId ?? 0)} />
      </div>
      <input
        css={s.listTitleInput}
        type="text"
        name="noteListTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {noteList?.noteListItemDto?.map((noteListItem) => (
        <ul css={s.noteItemList} key={noteListItem.noteListItemId}>
          <NoteListItem data={noteListItem} />
        </ul>
      ))}
      <div css={s.createBtn}>
        <BiPlus
          onClick={() => {
            noteList?.noteListId && createItem(noteList?.noteListId);
          }}
        />
      </div>
    </div>
  );
}

export default NoteList;
