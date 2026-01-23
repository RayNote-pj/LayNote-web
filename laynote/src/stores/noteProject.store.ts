import { create } from "zustand";
import axios from "axios";
import {
  MAIN_APT_PATH,
  NOTE_PROJECT_ALL,
  NOTE_PROJECT_CREATE,
  NOTE_PROJECT_PATH,
} from "../apis/apis";
import { NoteProjectDto } from "../types/dto";

interface NoteProjectStore {
  notes: NoteProjectDto[];
  isLoading: boolean;
  error: string | null;
  fetchNotes: (token: string) => Promise<void>;
  createNote: (token: string) => Promise<boolean>;
}

export const useNoteProjectStore = create<NoteProjectStore>((set) => ({
  notes: [],
  isLoading: false,
  error: null,

  fetchNotes: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PATH}${NOTE_PROJECT_ALL}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      set({ notes: res.data.data.noteProjects });
    } catch (e) {
      console.error(e);
      set({ error: "노트 목록 조회 실패" });
    } finally {
      set({ isLoading: false });
    }
  },

  createNote: async (token) => {
    try {
      await axios.post(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PATH}${NOTE_PROJECT_CREATE}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return true;
    } catch (e) {
      console.error(e);
      set({ error: "노트 생성 실패" });
      return false;
    }
  },
}));
