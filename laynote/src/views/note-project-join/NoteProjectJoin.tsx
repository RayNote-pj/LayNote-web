import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  MAIN_APT_PATH,
  NOTE_PROJECT_JOIN_PATH,
  NOTE_PROJECT_JOIN_POST,
} from "../../apis/apis";
import { useMatch } from "react-router-dom";
import useAuthStore from "../../stores/user.store";

function NoteProjectJoin() {
  const [cookies] = useCookies(["token"]);
  const { userEmail } = useAuthStore();
  const match = useMatch("/note/:noteProjectId/*");
  const noteProjectId = match?.params.noteProjectId;

  const joinFetch = async () => {
    try {
      await axios.post(
        `${MAIN_APT_PATH}${NOTE_PROJECT_JOIN_PATH}/${noteProjectId}${NOTE_PROJECT_JOIN_POST}`,
        { userEmail: userEmail },
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      noteProject 가입신청하기
      <button onClick={joinFetch}>신청</button>
    </div>
  );
}

export default NoteProjectJoin;
