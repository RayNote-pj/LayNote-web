import { create } from "zustand";
import { PinDto } from "../types/dto";
import axios from "axios";
import {
  MAIN_APT_PATH,
  NOTE_PROJECT_PIN,
  NOTE_PROJECT_PIN_GET,
} from "../apis/apis";

interface NoteProjectPinProps {
  pins: PinDto[];
  isLoading: boolean;
  error: string | null;
  fetchPins: (token: string) => Promise<void>;
}

export const useNoteProjectPintStore = create<NoteProjectPinProps>((set) => ({
  pins:[],
  isLoading: false,
  error: null,
  fetchPins: async (token) => {
    try {
      const res = await axios.get(
        `${MAIN_APT_PATH}${NOTE_PROJECT_PIN}${NOTE_PROJECT_PIN_GET}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      set({ pins: res.data.data.pinDto });
    } catch (error) {
      console.error(error);
      set({ error: "북마크 조회 실패" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
