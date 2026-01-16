import React from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './noteProjectBarStyle' 

function NoteProjectBar() {
  return (
    <div css = {s.barBackground}>
      <div css = {s.noteProjectUserImgDiv}>
          <img src="" alt="이미지" />
      </div>
      <div css = {s.noteProjectBarLine}></div>
      <button css = {s.createNoteBtn}>노트생성</button>
      <div css = {s.noteProjectBarLine}></div>
      <div css = {s.likeNoteDiv}>
        <span>즐겨찾기</span>
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
    </div>
  )
}

export default NoteProjectBar