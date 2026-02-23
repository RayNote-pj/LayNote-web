import { css } from "@emotion/react";

export const barBackground = css`
  width: 100px;
  overflow: hidden;
  height: 100%;  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-right: 2px solid #cccccc;
  padding: 20px 0px;
  box-sizing: border-box;
`
export const barDiv = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
export const createNoteBtnDiv = css`
  display: flex;
  flex-direction: column;
`
export const noteProjectBarLine = css`
  width: 300px;
  border: 1px solid #ccc;
  margin: 15px 0px;
`
export const createNoteBtn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 45px;
  height: 45px;
  border: 2px solid #9c9c9c;
  border-radius: 3px;
  font-size: 45px;
  box-sizing: border-box;
  background-color: #fff;
`
export const createNoteBtnSpan = css`
  font-family: 'YesMyungjo';
  font-size: 15px;
  text-align: center;
`
export const bookMarkSpan = css`
  font-size: 13px;
  font-family: 'YesMyungjo';
  font-weight: 700;
  text-align: center;
  color: #333;
`
export const likeNoteDiv = css`
  width: 100%;
  padding: 2px 3px;
  box-sizing: border-box;
`
export const likeNotListeDiv = css`
  margin: 10px 0px;
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  border-bottom: 0.5px solid #707070;
::-webkit-scrollbar {
  display: none;
}
`
export const likeNoteColumnDiv = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90px;
  margin-top: 15px;
  transition: transform 0.3s ease;
  :hover {
    cursor: pointer;
    transform: scale(1.4);
  }
`
export const likeNoteThumNail = css`
  width: 100%;
`
export const likeNoteThumNailDiv = css`
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 3px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #bebebe;
`
export const likeNoteTitleDiv = css`
  margin: 0px auto;
  width: 60px;
  padding: 0px 1px;
  box-sizing: border-box;
  font-size: 11px;
  text-align: center;
`
export const likeNoteTitleSpan = css`
  font-size: 13px;
  width: 100%;
`
export const trashBtnDiv = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  margin-bottom: 30px;
`