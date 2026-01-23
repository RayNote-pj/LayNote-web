import { css } from "@emotion/react";

export const userInfoBackground = css`
  background-color: #919191ff;
  width: 100vw;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const userInfoContainer = css`
  width: 400px;
  height: 550px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const logoDiv = css`
  display: flex;
  width: 105px;
  align-items: center;
  justify-content: space-between;
`;
export const imgLogo = css`
  width: 23px;
`;
export const textLogo = css`
  height: 11px;
`;
export const logoContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
`;
export const userInfoImgDiv = css`
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #b1b1b1;
  margin: 0px auto;
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const uploadImgDiv = css`
  display: flex;
  align-items: flex-end;
  margin: 0px auto;
`
export const userInfoImg = css`
  width: 150%;
`;
export const imgBtnDiv = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: 30px;
  background-color: #eee;
  border-radius: 5px;
  position: relative;
  right: 30px;
`;
export const pageName = css`
  width: 90px;
  font-family: "GounBatang";
  font-weight: 700;
  color: #6c7a89;
  text-align: center;
  height: 18px;
`;
export const infoBlank = css`
  width: 300px;
  height: 37px;
  border: 1.2px solid #c5c5c5;
  border-radius: 4px;
  font-size: 12px;
  padding: 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;
export const infoContainer = css`
  height: 290px;
`;
export const infoBox = css`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-family: "GounBatang";
  font-weight: 600;
  color: #333;
`;
export const constNickNameBox = css`
  width: 220px;
  height: 37px;
  border: 1px solid #c5c5c5;
  border-radius: 4px;
  font-size: 13px;
  padding: 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;
export const duplicationBtn = css`
  border: none;
  border-radius: 3px;
  background-color: #b4b4b4;
  color: white;
  font-size: 12px;
  width: 70px;
  :hover {
    cursor: pointer;
    background-color: #979696;
  }
`;
export const nickNameInputBtnDiv = css`
  display: flex;
  justify-content: space-between;
`;
export const cancelUpdateBtn = css`
  border: none;
  border-radius: 3px;
  height: 45px;
  width: 140px;
  background-color: #b4b4b4;
  font-family: "GounBatang";
  font-weight: 600;
  color: #fff;
  :hover {
    cursor: pointer;
    background-color: #979696;
  }
`;
export const cancelUpdateBtnDiv = css`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;
export const deleteAcoutnBtn = css`
  background-color: transparent;
  border: none;
  color: red;
  font-family: "ChangwonDangamRounded";
  text-align: center;
  width: 300px;
  margin-top: 10px;
  :hover {
    font-weight: 600;
    cursor: pointer;
  }
`;
