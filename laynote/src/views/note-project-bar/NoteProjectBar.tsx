import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './noteProjectBarStyle'
import { IoDuplicateOutline } from "react-icons/io5";
import axios from 'axios';
import { MAIN_APT_PATH, NOTE_PROJECT_CREATE, NOTE_PROJECT_PATH } from '../../apis/apis';
import { NoteProjectReqestDto } from '../../types/dto';
import { useCookies } from 'react-cookie';
import { VscTrash } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';



function NoteProjectBar() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const fetchData = async() => {
    try{
      await axios.post(`${MAIN_APT_PATH}${NOTE_PROJECT_PATH}${NOTE_PROJECT_CREATE}`, null ,{
        headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div css = {s.barBackground}>
      <div css={s.createNoteBtnDiv}>
        <button css = {s.createNoteBtn} onClick={fetchData}><IoDuplicateOutline /></button>
        <span css={s.createNoteBtnSpan}>New</span>
      </div>
      <div css = {s.noteProjectBarLine}></div>
      <div css = {s.likeNoteDiv}>
        <span css={s.bookMarkSpan}>Book Mark_</span>
        <div css = {s.likeNotListeDiv}>
          <div css = {s.likeNoteColumnDiv}>
            <div css = {s.likeNoteThumNailDiv}>
              <img css = {s.likeNoteThumNail} src="/lay-note-logo/laynote_image_logo.png" alt="썸네일" />
            </div>
            <div css = {s.likeNoteTitleDiv}>
              <span css = {s.likeNoteTitleSpan}>타이틀dddfdd</span>
            </div>
          </div>
        </div>
      </div>
      <VscTrash  onClick={() => navigate('/trash')}/>
    </div>
  )
}

export default NoteProjectBar