/** @jsxImportSource @emotion/react */
import * as s from "./noteBoxStyle";
import React, { useEffect, useRef, useState } from "react";
import { NoteBoxUpdateRequestDto, NoteComposition } from "../../../types/dto";
import { CiImageOff, CiImageOn } from "react-icons/ci";
import {
  COMPOSITION_POSITION_PUT,
  IMG_PATH,
  MAIN_APT_PATH,
  NOTE_BOX_DELETE,
  NOTE_BOX_PATH,
  NOTE_BOX_PUT,
  NOTE_BOX_PUT_IMG,
  NOTE_PROJECT_COMPOSITION_PATH,
} from "../../../apis/apis";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useCompositionStore } from "../../../stores/noteComposition.store";
import { FaMinus } from "react-icons/fa6";

interface NoteProps {
  noteCompositionId: string;
  data: NoteComposition;
  workspaceRef: React.RefObject<HTMLDivElement | null>;
}

function NoteBox({ noteCompositionId, data, workspaceRef }: NoteProps) {
  const {
    compositionX = data.compositionX,
    compositionY = data.compositionY,
    noteBox,
  } = data;
  const { noteProjectId } = useParams<{ noteProjectId: string }>();
  const [cookies] = useCookies(["token"]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { fetchNotes } = useCompositionStore();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [position, setPosition] = useState({
  x: compositionX,
  y: compositionY,
});
  const [formData, setFormData] = useState<NoteBoxUpdateRequestDto>({
    noteBoxTitle: noteBox?.noteBoxTitle ?? "",
    noteBoxContent: noteBox?.noteBoxContent ?? "",
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

  const x =
    e.clientX - rect.left + ws.scrollLeft - offset.current.x;
  const y =
    e.clientY - rect.top + ws.scrollTop - offset.current.y;

  setPosition({
    x: Math.max(0, x),
    y: Math.max(0, y),
  });
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
  } catch (error) {
    console.error(error);
  }
};

  const updateNoteBox = async () => {
    console.log(noteBox);
    try {
      await axios.put(
        `${MAIN_APT_PATH}${NOTE_BOX_PATH}/${noteProjectId}${NOTE_BOX_PUT}/${noteBox?.noteBoxId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        },
      );
      if (!noteProjectId) return;
      fetchNotes(cookies.token, noteProjectId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && e.ctrlKey) {
      updateNoteBox();
    }
  };

  const updateImg = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("imageUrl", file);
      
      await axios.post(
        `${MAIN_APT_PATH}${NOTE_BOX_PATH}/${noteProjectId}${NOTE_BOX_PUT_IMG}/${noteBox?.noteBoxId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        },
      );
      setPreviewUrl(URL.createObjectURL(file));
      if (!noteProjectId) return;
      fetchNotes(cookies.token, noteProjectId);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNoteBox = async (noteBoxId: number) => {
    const isConfirm = window.confirm("노트 박스를 삭제할까요?");
    if (!isConfirm) return;
      try {
        await axios.delete(
          `${MAIN_APT_PATH}${NOTE_BOX_PATH}/${noteProjectId}${NOTE_BOX_DELETE}/${noteBoxId}`,
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

  const inputHanlder = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
  setPosition({
    x: compositionX,
    y: compositionY,
  });
}, [compositionX, compositionY]);

  useEffect(() => {
    
    if (!noteBox) return;
    setFormData({
      noteBoxTitle: noteBox.noteBoxTitle ?? "",
      noteBoxContent: noteBox.noteBoxContent ?? "",
    });
  }, [noteBox]);

  useEffect(() => {
    if (!noteBox) return;
    if (
      formData.noteBoxTitle === noteBox.noteBoxTitle &&
      formData.noteBoxContent === noteBox.noteBoxContent
    )
      return;
    const timer = setTimeout(updateNoteBox, 500);
    return () => clearTimeout(timer);
  }, [formData]);

  return (
    <div
      css={s.noteBoxContainer}
      style={{
        left: position.x,
        top: position.y
      }}
      onMouseDown={onMouseDown}
    >
      <div
        css={s.closeDiv}
      >
        <FaMinus  onClick={() => {
          if (!noteBox?.noteBoxId) return;
          deleteNoteBox(noteBox?.noteBoxId);
        }}/>
      </div>
      <input
        css={s.titleInput}
        type="text"
        name="noteBoxTitle"
        value={formData?.noteBoxTitle}
        onKeyDown={handleKeyDown}
        onChange={inputHanlder}
        onBlur={updateNoteBox}
      />
      <div css={s.noteBoxImgDiv} onMouseEnter={()=> setIsModal(true)}
        onMouseLeave={()=> setIsModal(false)}
        >
        <div>
          {noteBox?.imageUrl ? (
            <img
              src={previewUrl ?? `${IMG_PATH}/${noteBox.imageUrl}`}
              alt={noteBox.imageUrl}
              style={{ width: "100%" }}
            />
          ) : (
            <CiImageOff size={50} color="gray" />
          )}
        </div>
        {isModal && 
      <label
      css={s.imgBtn}
      htmlFor={`note-box-image-${noteBox?.noteBoxId}`}
      >
        <CiImageOn />
      </label>
      }
      </div>
      <input
        id={`note-box-image-${noteBox?.noteBoxId}`}
        type="file"
        hidden
        onChange={(e) => {
          if (!e.target.files) return;
          updateImg(e.target.files[0]);
          e.target.value = "";
        }}
      />
      <textarea
        css={s.textareaBox}
        name="noteBoxContent"
        value={formData.noteBoxContent}
        onKeyDown={handleKeyDown}
        onChange={inputHanlder}
        placeholder="내용을 입력해주세요."
        onBlur={updateNoteBox}
      />
    </div>
  );
}

export default NoteBox;
