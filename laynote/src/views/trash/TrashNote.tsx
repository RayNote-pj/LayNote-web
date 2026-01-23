/** @jsxImportSource @emotion/react */
import * as s from "./trashNoteStyle";
import React, { useEffect, useState } from "react";
import { NoteProjectDto } from "../../types/dto";
import axios from "axios";
import {
  IMG_PATH,
  MAIN_APT_PATH,
  NOTE_PROJECT_COMPLETE_DELETE,
  NOTE_PROJECT_DELETE_DATE,
  NOTE_PROJECT_PATH,
  NOTE_PROJECT_TRASH,
} from "../../apis/apis";
import { useCookies } from "react-cookie";
import { IoIosClose, IoMdReturnLeft } from "react-icons/io";
import { AiOutlineRollback } from "react-icons/ai";

function TrashNote() {
  const [cookies] = useCookies(["token"]);
  const [noteDatas, setNoteDatas] = useState<NoteProjectDto[]>([]);

  const getFactData = async () => {
    try {
      const response = await axios.get(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PATH}${NOTE_PROJECT_TRASH}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );
      setNoteDatas(response.data.data.noteProjects);
    } catch (error) {
      console.error(error);
    }
  };

  const putFetchData = async (noteProjectId: string) => {
    try {
      await axios.put(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PATH}${NOTE_PROJECT_TRASH}/${noteProjectId}${NOTE_PROJECT_DELETE_DATE}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );
      getFactData();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteNoteProject = async (noteProjectId: string) => {
    const isConfirm = window.confirm(
      "삭제된 데이터는 복구할 수 없습니다.정말 삭제하시겠습니까?"
    );
    if (!isConfirm) return;
    try {
      await axios.delete(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PATH}/${noteProjectId}${NOTE_PROJECT_COMPLETE_DELETE}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );
      getFactData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cookies.token) {
      getFactData();
    }
  }, [cookies.token]);

  return (
    <div>
      <div css={s.noteProjectBackground}>
        <div css={s.notePageTitleDiv}>
          <span css={s.notePageTitleSpan}>Notes's trash </span>
          <div css={s.notePageTitleLine}></div>
          <span css={s.noticSpan}>삭제일 기준 30일 이후 자동 삭제.</span>
        </div>
        <div css={s.noteProjectContainer}>
          {noteDatas.map((note) => (
            <div css={s.noteProjectDiv} key={note.noteProjectId}>
              <div css={s.bookMarkDiv}>
                <IoMdReturnLeft
                  onClick={() => putFetchData(note.noteProjectId)}
                />
                <IoIosClose
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNoteProject(note.noteProjectId);
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
                <span css={s.noteProjectTitleSpan}>
                  {note.noteProjectTitle}
                </span>
                <span css={s.noteProjectDateSpan}>
                  삭제일 : {note.deletedAt.split("T")[0]}
                </span>
              </div>
              <div css={s.noteProjectContentDiv}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrashNote;
