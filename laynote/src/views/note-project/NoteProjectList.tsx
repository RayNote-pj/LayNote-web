/** @jsxImportSource @emotion/react */
import * as s from "./noteProjectListStyle";
import React, { useEffect, useState } from "react";
import { NoteProjectDto, NoteProjectReqestDto } from "../../types/dto";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  IMG_PATH,
  MAIN_APT_PATH,
  NOTE_PROJECT_ALL,
  NOTE_PROJECT_DELETE,
  NOTE_PROJECT_PATH,
  NOTE_PROJECT_UPDATE_IMAGE,
  NOTE_PROJECT_UPDATE_TITLE,
} from "../../apis/apis";
import { CiImageOn } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

function NoteProjectList() {
  const [cookies] = useCookies(["token"]);
  const [isBookMark, setIsBookMark] = useState<boolean>(false);
  const [noteData, setNoteData] = useState<NoteProjectDto[]>([]);
  const [updateComplete, setUpdateComplete] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const getFetchData = async () => {
    try {
      const response = await axios.get(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PATH}${NOTE_PROJECT_ALL}`,
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
      getFetchData();
    } catch (error) {
      console.error(error);
    }
  };

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

      getFetchData();
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
      getFetchData();
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

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <div css={s.noteProjectBackground}>
      <div css={s.notePageTitleDiv}>
        <span css={s.notePageTitleSpan}>My Notes.</span>
        <div css={s.notePageTitleLine}></div>
      </div>
      <div css={s.noteProjectContainer}>
        {noteData.map((note, index) => (
          <div css={s.noteProjectDiv} key={note.noteProjectId}>
            <div css={s.bookMarkDiv}>
              {isBookMark ? (
                <div css={s.bookMark}>
                  <FaBookmark />
                </div>
              ) : (
                <div css={s.bookMark}>
                  <FaRegBookmark />
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
            <div css={s.noteProjectImgDiv}>
              <img
                css={s.noteProjectImg}
                src={`${IMG_PATH}/${note.noteProjectImageUrl}`}
                alt={note.noteProjectImageUrl}
              />
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
