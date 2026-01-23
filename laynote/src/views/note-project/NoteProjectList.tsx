/** @jsxImportSource @emotion/react */
import * as s from "./noteProjectListStyle";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  IMG_PATH,
  MAIN_APT_PATH,
  NOTE_PROJECT_DELETE,
  NOTE_PROJECT_PATH,
  NOTE_PROJECT_PIN,
  NOTE_PROJECT_PIN_DELETE,
  NOTE_PROJECT_PIN_POST,
  NOTE_PROJECT_UPDATE_IMAGE,
  NOTE_PROJECT_UPDATE_TITLE,
} from "../../apis/apis";
import { CiImageOff, CiImageOn, CiUser } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useNoteProjectStore } from "../../stores/noteProject.store";
import { useNoteProjectPintStore } from "../../stores/noteProjectPin.store";

function NoteProjectList() {
  const [cookies] = useCookies(["token"]);
  const { notes, fetchNotes } = useNoteProjectStore();
  const { pins, fetchPins } = useNoteProjectPintStore();
  const [updateComplete, setUpdateComplete] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();

  const isPinned = (noteProjectId: string) => {
    return pins.some((pin) => pin.noteProjectId === noteProjectId);
  };
  const updateTitleFetchData = async (noteProjectId: string) => {
    try {
      await axios.put(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PATH}/${noteProjectId}${NOTE_PROJECT_UPDATE_TITLE}`,
        { noteProjectTitle: title },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const createPin = async (noteProjectId: string) => {
    try {
      await axios.post(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PIN}/${noteProjectId}${NOTE_PROJECT_PIN_POST}`,
        {},
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        }
      );
      fetchPins(cookies.token);
    } catch (e) {
      console.error(e);
    }
  };

  const getPinIdByNoteProjectId = (noteProjectId: string): string | undefined =>
    pins.find((pin) => pin.noteProjectId === noteProjectId)?.pinId;

  const cancelPin = async (noteProjectId: string) => {
    if (!cookies.token) return;

    const pinId = getPinIdByNoteProjectId(noteProjectId);
    if (!pinId) return;
    try {
      await axios.delete(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PIN}/${pinId}${NOTE_PROJECT_PIN_DELETE}`,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        }
      );
      fetchPins(cookies.token);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNotes(cookies.token);
  }, []);

  const updateImageFetchData = async (noteProjectId: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append("noteProjectImageUrl", file);

      await axios.post(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PATH}/${noteProjectId}${NOTE_PROJECT_UPDATE_IMAGE}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );
      fetchNotes(cookies.token);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNoteFetchData = async (noteProjectId: string) => {
    const isConfirm = window.confirm("삭제된 항목은 휴지통으로 이동됩니다.");
    if (!isConfirm) return;
    try {
      await axios.put(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PATH}/${noteProjectId}${NOTE_PROJECT_DELETE}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );
      fetchNotes(cookies.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    noteProjectId: string
  ) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    updateTitleFetchData(noteProjectId);

    setUpdateComplete(noteProjectId);
    setTimeout(() => {
      setUpdateComplete(null);
    }, 2500);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div css={s.noteProjectBackground}>
      <div css={s.notePageTitleDiv}>
        <span css={s.notePageTitleSpan}>My Notes.</span>
        <div css={s.notePageTitleLine}></div>
      </div>
      <div css={s.noteProjectContainer}>
        {notes.map((note, index) => (
          <div css={s.noteProjectDiv} key={note.noteProjectId}>
            <div css={s.bookMarkDiv}>
              {isPinned(note.noteProjectId) ? (
                <div
                  css={s.bookMark}
                  onClick={() => cancelPin(note.noteProjectId)}
                >
                  <FaBookmark color="rgb(111, 158, 127)"/>
                </div>
              ) : (
                <div
                  css={s.bookMark}
                  onClick={() => createPin(note.noteProjectId)}
                >
                  <FaRegBookmark color="rgb(111, 158, 127)"/>
                </div>
              )}
              <IoIosClose
                css={s.ioIosClose}
                size={20}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNoteFetchData(note.noteProjectId);
                }}
              />
            </div>
            <div css={s.noteProjectImgDiv} onClick={() => navigate(`/note/${note.noteProjectId}`)}>
              {note.noteProjectImageUrl ? 
                <img
                  css={s.noteProjectImg}
                  src={`${IMG_PATH}/${note.noteProjectImageUrl}`}
                  alt={note.noteProjectImageUrl}
                />
              :
                <CiImageOff size={35} color="gray"/>
              }
            </div>
            <div css={s.noteProjectTitleDiv}>
              <div css={s.titleUpdateDiv}>
                <input
                  type="text"
                  name="noteProjectTitle"
                  css={s.noteProjectTitleInput}
                  onChange={inputHandler}
                  onKeyDown={(e) => handleKeyDown(e, note.noteProjectId)}
                  defaultValue={note.noteProjectTitle}
                />
                {updateComplete === note.noteProjectId && (
                  <span css={s.updateMg}>
                    수정됨
                    <FaRegCheckCircle height={"11px"} />
                  </span>
                )}
              </div>
              <div css={s.noteProjectContentDiv}>
                <div css={s.dateSpanDiv}>
                  <span css={s.noteProjectDateSpan}>
                    생성일 : {note.createdAt.split("T")[0]}
                  </span>
                  <span css={s.noteProjectDateSpan}>
                    수정일 : {note.updatedAt.split("T")[0]}
                  </span>
                </div>
                <div css={s.noteProjectImgBtnDiv}>
                  <label htmlFor={`image-upload-${note.noteProjectId}`}>
                    <CiImageOn />
                    <input
                      id={`image-upload-${note.noteProjectId}`}
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (!e.target.files) return;
                        updateImageFetchData(
                          note.noteProjectId,
                          e.target.files[0]
                        );
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteProjectList;
