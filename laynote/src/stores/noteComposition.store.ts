/** @jsxImportSource @emotion/react */
import { create } from "zustand";
import { NoteComposition } from "../types/dto";
import axios from "axios";
import { COMPOSITION_GET, MAIN_APT_PATH, NOTE_BOX_PATH, NOTE_BOX_POST, NOTE_IMAGE_BOX_LIST_PATH, NOTE_IMAGE_BOX_PATH, NOTE_IMG_BOX_CREATE, NOTE_LIST_CREATE, NOTE_LIST_PATH, NOTE_PROJECT_COMPOSITION_PATH } from "../apis/apis";

interface NoteCompositionStore {
  items:NoteComposition[] 
  isLoading: boolean;
  error: string | null;
  fetchNotes: (token: string, noteProjectId:string) => Promise<void>;
  noteBoxCreate: (token: string, noteProjectId:string) => Promise<void>;
  noteListCreate: (token: string, noteProjectId:string) => Promise<void>;
  noteImgBoxCreate: (token: string, noteProjectId:string) => Promise<void>;
}

export const useCompositionStore = create<NoteCompositionStore>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchNotes: async (token, noteProjectId) => {
    set({ isLoading: true, error: null});
    try {
      const res = await axios.get(`${MAIN_APT_PATH}${NOTE_PROJECT_COMPOSITION_PATH}/${noteProjectId}${COMPOSITION_GET}`, {
            headers : {
              Authorization: `Bearer ${token}`
            }, withCredentials: true,
          }
          );
          set({ items: res.data.data});
        } catch (error) {
          console.error(error);
          set({ error: "노트 목록 조회 실패"});
        } finally {
          set({isLoading: false});
        }
  },

  noteBoxCreate: async (token, noteProjectId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${MAIN_APT_PATH}${NOTE_BOX_PATH}/${noteProjectId}${NOTE_BOX_POST}`, {}
        , {
          headers: { Authorization: `Bearer ${token}`},
          withCredentials:true,
        }
      );
      set({ items: res.data.data});
    } catch (e) {
      console.error(e)
      set({ error: "노트 박스 생성 실패"});
    } finally {
      set({ isLoading: false});
    }
  },

  noteListCreate: async (token, noteProjectId) => {
    set({isLoading: true, error:null});
    try {
      const res = await axios.post(`${MAIN_APT_PATH}${NOTE_LIST_PATH}/${noteProjectId}${NOTE_LIST_CREATE}`, {},
        {
          headers: { Authorization: `Bearer ${token}`}, withCredentials: true,
        }
      );
      set({ items: res.data.data});
    } catch (e) {
      console.error(e)
      set({ error: "노트 목록 생성 실패"});
    } finally {
      set({ isLoading: false});
    }
  },

  noteImgBoxCreate: async (token, noteProjectId) => {
    set({isLoading: true, error: null});
    try {
      const res = await axios.post(`${MAIN_APT_PATH}${NOTE_IMAGE_BOX_LIST_PATH}/${noteProjectId}${NOTE_IMG_BOX_CREATE}`, {}, 
        {headers: {Authorization: `Bearer ${token}`},
        withCredentials: true,
      }
      );
      set({items: res.data.data});
    } catch (e) {
      console.error(e);
      set({error: "노트 이미지 박스 생성"})
    } finally {
      set({ isLoading: false });
    }
  }
}));