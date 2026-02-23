import { css } from "@emotion/react";

export const noteListContainer = css`
  width: 320px;
  background-color: #f3f3f3;
  border: 1px solid #b4b4b4;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  cursor:move;
  :active, :focus {
    outline: 1px solid #333;
  }
`
export const listDeleteBtn = css`
  width: 100%;
  text-align: right;
  margin-right: 10px;
`
export const listTitleInput = css`
  width: 80%;
  padding: 7px;
  box-sizing: border-box;
  border: none;
  margin-bottom: 10px;
  background-color: transparent;
  outline: none;
  font-size: 16px;
  font-family: 'ChangwonDangamRounded';
  font-weight: 500;
`
export const noteItemList = css`
  width: 380px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
  `
export const listitemLi = css`
  /* border: 2px solid #8f8f8f; */
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 6px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: white;
  `
export const itemLi = css`
  width: 260px;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  font-size: 13px;
  display: flex;
  outline: none;
  font-family: 'ChangwonDangamRounded';
`
export const liDiv = css`

`
export const dragHandle = css`
  cursor:move;
`
export const createBtn = css`
  cursor: pointer;
`
export const deleteItem = css`
  position: absolute;
  right: 20px;
  cursor: pointer;
  color: white;
  width: 20px;
  height: 20px;
  padding: 3px;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: rgba(56, 56, 56, 0.8);
`