import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./noteProjectBarStyle";
import { IoDuplicateOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import { VscTrash } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useNoteProjectStore } from "../../stores/noteProject.store";
import { useNoteProjectPintStore } from "../../stores/noteProjectPin.store";
import { IMG_PATH } from "../../apis/apis";
import { CiImageOff } from "react-icons/ci";

function NoteProjectBar() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { createNote, fetchNotes } = useNoteProjectStore();
  const { pins, fetchPins } = useNoteProjectPintStore();

  const handleCreate = async () => {
    const success = await createNote(cookies.token);
    if (success) {
      fetchNotes(cookies.token);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchPins(cookies.token);
  }, []);

  return (
    <div css={s.barBackground}>
      <div css={s.barDiv}>
        <div css={s.createNoteBtnDiv}>
          <button css={s.createNoteBtn} onClick={handleCreate}>
            <IoDuplicateOutline />
          </button>
          <span css={s.createNoteBtnSpan}>New</span>
        </div>
        <div css={s.noteProjectBarLine}></div>
        <div css={s.likeNoteDiv}>
          <span css={s.bookMarkSpan}>Book Mark_</span>
          <div css={s.likeNotListeDiv}>
            {pins.map((pin) => (
              <div
                css={s.likeNoteColumnDiv}
                key={pin.pinId}
                onClick={() => navigate(`/note/${pin.noteProjectId}`)}
              >
                <div css={s.likeNoteThumNailDiv}>
                  {pin.noteProjectImageUrl ? (
                    <img
                      css={s.likeNoteThumNail}
                      src={`${IMG_PATH}/${pin.noteProjectImageUrl}`}
                      alt="썸네일"
                    />
                  ) : (
                    <CiImageOff size={18} color="gray" />
                  )}
                </div>
                <div css={s.likeNoteTitleDiv}>
                  {pin.noteProjectTitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div css={s.trashBtnDiv}>
        <VscTrash onClick={() => navigate("/trash")} />
      </div>
    </div>
  );
}

export default NoteProjectBar;
