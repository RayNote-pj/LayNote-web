/** @jsxImportSource @emotion/react */
import * as s from "./noteListStyle";
import React, { useEffect, useState } from "react";
import { NoteListItemDto } from "../../../types/dto";
import { useCompositionStore } from "../../../stores/noteComposition.store";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  MAIN_APT_PATH,
  NOTE_LIST_ITEM_CHECK,
  NOTE_LIST_ITEM_CREATE,
  NOTE_LIST_ITEM_DELTE,
  NOTE_LIST_ITEM_PATH,
  NOTE_LIST_ITEM_UPDATE,
} from "../../../apis/apis";
import { FaMinus } from "react-icons/fa6";

interface NoteProps {
  data: NoteListItemDto;
}

function NoteListItem({ data }: NoteProps) {
  const { fetchNotes } = useCompositionStore();
  const { noteProjectId } = useParams<{ noteProjectId: string }>();
  const [cookies] = useCookies(["token"]);
  const [isBtn, setBtn] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState(data.noteListCheck);
  const [noteContent, setNoteContent] = useState(data.noteListContent ?? "");

  const updateContent = async () => {
    try {
      await axios.put(
        `${MAIN_APT_PATH}${NOTE_LIST_ITEM_PATH}/${noteProjectId}${NOTE_LIST_ITEM_UPDATE}/${data.noteListItemId}`,
        { noteListContent: noteContent },
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const checkContent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextCheck = e.target.checked;
    setIsCheck(nextCheck);
    try {
      await axios.put(
        `${MAIN_APT_PATH}${NOTE_LIST_ITEM_PATH}/${noteProjectId}${NOTE_LIST_ITEM_CHECK}/${data.noteListItemId}`,
        null,
        {
          params: { noteListCheck: nextCheck },
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (noteListItemId: number) => {
    try {
      await axios.delete(
        `${MAIN_APT_PATH}${NOTE_LIST_ITEM_PATH}/${noteProjectId}${NOTE_LIST_ITEM_DELTE}/${noteListItemId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        },
      );
      fetchNotes(cookies.token, noteProjectId ?? "");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      updateContent();
    }
  };

  useEffect(() => {
    setNoteContent(data.noteListContent ?? "");
  }, [data.noteListContent]);

  useEffect(() => {
    if (noteContent === data.noteListContent) return;

    const timer = setTimeout(() => {
      updateContent();
    }, 500);
    return () => clearTimeout(timer);
  }, [noteContent]);

  return (
    <li
      css={s.listitemLi}
      onMouseEnter={() => setBtn(true)}
      onMouseLeave={() => setBtn(false)}
    >

        <input
          type="checkBox"
          name="noteListCheck"
          checked={isCheck}
          onChange={checkContent}
        />
        <input
          css={s.itemLi}
          placeholder="content..."
          type="text"
          name="noteListContent"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />

      {isBtn && (
        <FaMinus
          css={s.deleteItem}
          onClick={() => deleteItem(data.noteListItemId)}
        />
      )}
    </li>
  );
}

export default NoteListItem;
