import React, { useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from "./joinUserBarStyle";
import { useCookies } from 'react-cookie';
import { FiUserPlus } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { NoteProjectJoin, NoteProjectMemberDto } from '../../types/dto';
import axios from 'axios';
import { MAIN_APT_PATH, NOTE_PROJECT_JOIN_PATH, NOTE_PROJECT_USER_GET, NOTE_PROJECT_USER_PATH } from '../../apis/apis';
import { useMatch, useParams } from 'react-router-dom';
import UrlModal from './UrlModal';

function JoinUserBar() {
  const [cookies] = useCookies(["token"]);
  const match = useMatch("/note/:noteProjectId/*");
  const noteProjectId = match?.params.noteProjectId;
  const [projectUsers, setProjectUser] = useState<NoteProjectMemberDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [joins, setJoins] = useState<NoteProjectJoin[]>([]);

    const getMemberFetch = async () => {
    try {
      const response = await axios.get(
        `${MAIN_APT_PATH}${NOTE_PROJECT_JOIN_PATH}/${noteProjectId}`,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        },
      );
      setJoins(response.data.data.noteProjectJoins)
    } catch (error) {
      console.error(error);
    }
  };

  const projectUsersFetchData = async () => {
    try{
      const response = await axios.get(`${MAIN_APT_PATH}${NOTE_PROJECT_USER_PATH}${NOTE_PROJECT_USER_GET}/${noteProjectId}`, 
        {
          headers: {Authorization: `Bearer ${cookies.token}`},
          withCredentials: true,
        }
      )
      setProjectUser(response.data.data.noteProjectUserDtoList)
    } catch (error) {

    }
  } 

  useEffect(() => {
    if(!cookies.token) return;
    projectUsersFetchData()
    getMemberFetch();
    console.log(joins);
  }, []);

  return (
    <div css={s.container}>
      <div> 
        <FiUsers />
        <span>+{projectUsers.length}</span>
      </div>
      <FiUserPlus />
      {isModalOpen || 
        <UrlModal />
      }
      <div>
        <ul>
          {projectUsers.map(projectUser => 
            <li>{projectUser.userEmail}
            {projectUser.userRole}
            </li>
          )}
        </ul>
        <ul>
          {joins.map(join => 
            <li>
              {join.userEmail}
              {join.joinStatus}
            </li>
          )
          }
        </ul>
      </div>
    </div>
  )
}

export default JoinUserBar