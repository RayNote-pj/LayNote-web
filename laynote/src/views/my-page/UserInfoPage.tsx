/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./myPageStyle";
import { User } from "../../types";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  AUTH_PATH,
  DUPLICATE,
  IMG_PATH,
  MAIN_APT_PATH,
  USER_INFO,
  USER_PATH,
  USER_UPDATE,
} from "../../apis/apis";
import { CiImageOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { UserUpdatedto } from "../../types/dto";

function UserInfoPage() {
  const [cookies] = useCookies(["token"]);
  const [userData, setUserData] = useState<UserUpdatedto>({
    userEmail: "",
    nickName: "",
    userName: "",
    userPhone: "",
    profileImageUrl: "",
  });

  const [userProfileImg, setUserProfileImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDuplication, setIsDuplication] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const handleImgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserProfileImg(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const userDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!userData) return;
    setUserData((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const updateUserInfo = async () => {
  if (!userData) return;

  try {
    const formData = new FormData();

    if (userProfileImg) {
      formData.append("profileImageUrl", userProfileImg);
    }

    formData.append("nickName", userData.nickName ?? "");
    formData.append("userName", userData.userName ?? "");
    formData.append("userPhone", userData.userPhone ?? "");

    await axios.put(
      `${MAIN_APT_PATH}${USER_PATH}${USER_UPDATE}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      }
    );
    alert("수정이 완료되었습니다.");
    userInfo();
  } catch (error) {
    console.error(error);
    alert("수정에 실패했습니다.");
  }
};

  const duplicationNickName = async(nickName: string) => {
    try {
      const response = await axios.get(`${MAIN_APT_PATH}${AUTH_PATH}${DUPLICATE}/${nickName}`);

      setIsDuplication(response.data);
    } catch (error) {
      console.error(error);
    }
  }

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
        <div css={s.uploadImgDiv}>
        <div css={s.userInfoImgDiv}>
          <img
            css={s.userInfoImg}
            src={previewUrl || `${IMG_PATH}/${userData.profileImageUrl}`}
            alt={userData?.profileImageUrl}
          />
        </div>
          <label htmlFor="profileImage" css={s.imgBtnDiv}>
            <CiImageOn />
          </label>
            <input
              id="profileImage"
              type="file"
              style={{ display: "none" }}
              onChange={handleImgFileChange}
            />
        </div>
        <div css={s.infoContainer}>
          <div css={s.infoBox}>
            <span>Email address.</span>
            <div css={s.infoBlank}>{userData?.userEmail}</div>
          </div>
          <div css={s.infoBox}>
            <label>Nickname.  {isDuplication ? <span>닉네임 중북</span>: <span>사용가능</span>}</label>
            <div css={s.nickNameInputBtnDiv}>
              <input
                css={s.constNickNameBox}
                type="text"
                name="nickName"
                onChange={userDataChange}
                value={userData?.nickName}
                placeholder="2자~14자(영문, 한글, 숫자 허용)"
              />
              <button css={s.duplicationBtn} onClick={() => duplicationNickName(userData.nickName)}>중복확인</button>
            </div>
          </div>
          <div css={s.infoBox}>
            <label>Name.</label>
            <input
              css={s.infoBlank}
              type="text"
              onChange={userDataChange}
              name="userName"
              value={userData?.userName}
              placeholder="2자~16자(영문, 한글 허용)"
            />
          </div>
          <div css={s.infoBox}>
            <label>Phone.</label>
            <input
              css={s.infoBlank}
              type="text"
              onChange={userDataChange}
              name="userPhone"
              value={userData?.userPhone}
            />
          </div>
        </div>
        <div>
          <div css={s.cancelUpdateBtnDiv}>
            <button css={s.cancelUpdateBtn} 
              onClick={() => navigate(-1)}>
              CANCEL
            </button>
            <button css={s.cancelUpdateBtn}
              onClick={updateUserInfo}>
              UPDATE
            </button>
          </div>
          <button css={s.deleteAcoutnBtn} onClick={() => navigate(`/my-page/delete-acount`)}>Delete Acount</button>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;
