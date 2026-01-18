import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./myPageStyle";
import { User } from "../../types";
import { useCookies } from "react-cookie";
import axios from "axios";
import { MAIN_APT_PATH, USER_INFO, USER_PATH } from "../../apis/apis";

function UserInfoPage() {
  const [cookies] = useCookies(["token"]);
  const [userData, setUserData] = useState<User | null>(null);

  const userInfo = async () => {
    if (!cookies.token) return;
    try {
      const response = await axios.get(
        `${MAIN_APT_PATH}${USER_PATH}${USER_INFO}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userInfo();
  }, []);

  return (
    <div css={s.userInfoBackground}>
      <div css={s.userInfoContainer}>
        <div css={s.logoContainer}>
          <div css={s.logoDiv}>
            <img
              css={s.imgLogo}
              src="/lay-note-logo/laynote_image_logo.png"
              alt="laynote"
            />
            <img
              css={s.textLogo}
              src="/lay-note-logo/laynote_text_logo.png"
              alt="laynote"
            />
          </div>
          <span css={s.pageName}>My page</span>
        </div>
        <div css={s.userInfoImgDiv}>
          <img
            src={userData?.profileImageUrl}
            alt={userData?.profileImageUrl}
          />
        </div>
        <div css={s.infoContainer}>
          <div css={s.infoBox}>
            <span>Email address.</span>
            <div css={s.infoBlank}>{userData?.userEmail}</div>
          </div>
          <div css={s.infoBox}>
          <label>Nickname.</label>
          <div css={s.nickNameInputBtnDiv}>
            <input css={s.constNickNameBox} type="text" name="nickName" defaultValue={userData?.nickName}/>
            <button css={s.duplicationBtn}>중복확인</button>
          </div>
          </div>
          <div css={s.infoBox}>
            <label>Name.</label>
            <input css={s.infoBlank} type="text" name="userName" defaultValue={userData?.userName}/>
          </div>
          <div css={s.infoBox}>
            <label>Phone.</label>
            <input css={s.infoBlank} type="text" name="userPhone" defaultValue={userData?.userPhone}/>
          </div>
        </div>
        <div>
          <div css={s.cancelUpdateBtnDiv}>
            <button css={s.cancelUpdateBtn}>CNACEL</button>
            <button css={s.cancelUpdateBtn}>UPDATE</button>
          </div>
          <button css={s.deleteAcoutnBtn}>Delete Acount</button>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;
