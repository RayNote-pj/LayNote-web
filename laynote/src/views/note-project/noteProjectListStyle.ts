import { css } from "@emotion/react";

export const noteProjectBackground = css`
  width: 100%;
  height: 100%;
`
export const ioIosClose = css`
  transition: transform 0.2s ease-in-out;
  :hover {
    cursor: pointer;
    transform: scale(1.5);
  }
`
export const notePageTitleDiv = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 108px;
`
export const notePageTitleLine = css`
  width: 250px;
  border: 1px solid #858484;
  border-radius: 0px 2px 2px 0px;
  margin-top: 5px;
`
export const notePageTitleSpan = css`
  padding-left: 130px;
  font-size: 20px;
  font-family: 'YesMyungjo';
  font-weight: 700;
`
export const noteProjectContainer = css`
  width: 1410px;
  display: flex;
  flex-wrap: wrap;
  margin: 60px auto;
  `
export const noteProjectDiv = css`
  width: 270px;
  height: 300px;
  border-radius: 10px;
  border: 1px solid #c0c0c0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 40px;
`
export const noteProjectImgDiv = css`
  width: 100%;
  height: 62%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  overflow: hidden;
  :hover {
    cursor: pointer;
  }
`
export const noteProjectImg = css`
  width: 100%;
  transition: transform 0.2s ease-in-out;
  :hover {
    transform: scale(1.2);
  }
`
export const noteProjectTitleDiv = css`
  width: 100%;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  `
export const noteProjectTitleInput = css`
  font-family: 'YesMyungjo';
  font-size: 14px;
  font-weight: 500;
  width: 77%;
  border: none;
  margin-right: 11px;
  border-bottom: 1px solid #333;

  :focus {
  outline: none;
  border-bottom: 1px solid #333;

}
`
export const noteProjectDateSpan = css`
  font-family: 'YesMyungjo';
  font-size: 11px;
  color: #7a7a7a;
  margin-top: 1px;
`
export const dateSpanDiv = css`
  display: flex;
  flex-direction: column;
`
export const noteProjectContentDiv = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const noteProjectImgBtnDiv = css`
  font-size: 30px;
  transition: transform 0.2s ease-in-out;
  :hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`
export const bookMark = css`
  font-size: 20px;
  transition: transform 0.2s ease-in-out;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  `
export const bookMarkDiv = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 10px;
  box-sizing: border-box;
`
export const updateMg = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: #4caf50;
  margin-top: 4px;
  font-size: 10px;
  width: 20%;
`
export const titleUpdateDiv = css`
  display: flex;
  align-items: center;
  width: 100%;
`
