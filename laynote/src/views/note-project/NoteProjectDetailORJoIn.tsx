import React, { useEffect, useState } from "react";
import NoteProjectDetail from "./NoteProjectDetail";
import NoteProjectJoin from "../note-project-join/NoteProjectJoin";
import axios from "axios";
import {
  MAIN_APT_PATH,
  NOTE_PROJECT_USER_CHECK_MEMBER,
  NOTE_PROJECT_USER_PATH,
} from "../../apis/apis";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

function NoteProjectDetailORJoIn() {
  const { noteProjectId } = useParams<{ noteProjectId: string }>();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState<boolean>(false);

  const checkMember = async () => {
    try {
      const response = await axios.get(
        `${MAIN_APT_PATH}${NOTE_PROJECT_USER_PATH}${NOTE_PROJECT_USER_CHECK_MEMBER}/${noteProjectId}`,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        },
      );
      setIsMember(response.data.data);
    } catch (error) {
      console.error(error);
      setIsMember(false);
    }
  };
  
  useEffect(() => {
    if(!cookies.token) return navigate("/login");
    checkMember();
  }, []);

  useEffect(() => {
  console.log("isMember 변경됨:", isMember);
}, [isMember]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {isMember ? <NoteProjectDetail /> : <NoteProjectJoin />}
    </div>
  );
}

export default NoteProjectDetailORJoIn;
