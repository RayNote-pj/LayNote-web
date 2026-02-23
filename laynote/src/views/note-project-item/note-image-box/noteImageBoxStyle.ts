import { css } from "@emotion/react";

export const noteImgListContainer = css`
  width: 300px;
  background-color: white;
  border: 5px;
  border: 1px solid #c0c0c0;
  position: absolute;
  display: flex;
  flex-direction: column;
  cursor:move;
  `
export const deleteBtn = css`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  font-size: 20px;
`
export const noteImgBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const imgBoxDivDiv = css`
  width: 100%;
  height: 270px;
  border-top: 1px solid #c0c0c0;
  border-bottom: 1px solid #c0c0c0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`
export const imgBoxDiv = css`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
export const modal = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 65px;
  height: 65px;
  background-color: white;
  border: 1px solid #eee;
  position: absolute;
  top: 35px;
  right: 10px;
  padding: 6px 1px;
  box-sizing: border-box;
  border-radius: 3px;
  font-size: 13px;
`
export const changeImgBtn = css`
  width: 100%;
  text-align: center;
  cursor: pointer;
`
export const noteimage = css`
  width: 100%;
`
export const caption = css`
  width: 95%;
  padding: 10px;
  box-sizing: border-box;
  height: 20px;
  font-size: 11px;
  border-radius: 3px;
  outline: none;
  border: 1px solid #c0c0c0;
  margin: 8px;
`
export const imgBtn = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  font-size: 15px;
  top: 10px;
  right: 10px;
  color: white;
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
`
export const line = css`
  width: 100%;
  border: 0.3px solid #eee;
`
export const noteImgBoxDeleteBtn = css`
  width: 100%;
  cursor: pointer;
  text-align: center;
`
export const deleteBtnDiv = css`
  padding: 0px 10px;
  box-sizing: border-box;
  text-align: right;
`