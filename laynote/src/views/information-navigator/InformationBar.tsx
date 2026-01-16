import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./informationBarStyle";
import { IoSettingsOutline } from "react-icons/io5";
import userAuthStore from "../../stores/user.store";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import axios from "axios";
import { MAIN_APT_PATH, USER_INFO, USER_PATH } from "../../apis/apis";
import InformationModal from "./InformationModal";


function InformationBar() {
  const { userEmail, isAuthenticated, logout } = userAuthStore();
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  const [data, setData] = useState<User|null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchData = async() => {
    try {
      const response = await axios.get(`${MAIN_APT_PATH}${USER_PATH}${USER_INFO}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      )
      setData(response.data.data);
    } catch (error) {
      console.error("error");
    }
  }

  useEffect(() => {
    fetchData()
    if (!cookies.token) {
      logout();
    }
  }, [cookies.token, logout]);

  const handleLougoutClick = () => {
    setCookies("token", "", { expires: new Date() });
    removeCookie("token", { path: "/" });
    logout();
    navigate("/");
  };

  return (
    <div css={s.divBackground}>
      <div css={s.imformationContainer}>
        <div css={s.logoDiv} onClick={() => navigate("/")}>
          <img
            css={s.logoImg}
            src="/lay-note-logo/laynote_image_logo.png"
            alt="laynote"
          />
          <img
            css={s.logoText}
            src="/lay-note-logo/laynote_text_logo.png"
            alt="laynote"
          />
        </div>
        {isAuthenticated ? (
          <div css={s.topInfoDiv}>
            <div css={s.topInfoImageDiv}>
              <img css={s.topInfoImage} src={data?.profileImageUrl} alt="이미지" />
            </div>
            <div css={s.topInfoNickDiv}>
              <span css={s.topInfoNickSpan}>{data?.nickName}</span>
            </div>
            <div onClick={() => setIsModal(prev => !prev)}>
              <IoSettingsOutline css={s.ioSettingsOutline} />
            </div>
          </div>
        ) : (
          <div css={s.noAuthTopInfoDiv}>
            <span>생각 정리 노트.</span>
          </div>
        )}
      </div>
      {isAuthenticated && isModal && <InformationModal />}
      
    </div>
  );
}

export default InformationBar;
