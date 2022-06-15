import create from 'zustand';
import axios from "axios";
import { baseUrl } from "../environment/env";

type adminStore = {
  isAdmin: boolean
  setIsAdmin: () => void;
};

export const useEditorAdmin = create<adminStore>((set,) => ({
  isAdmin: false,
  setIsAdmin: () => {
    axios.get(`${baseUrl}/users/isadmin/`)
      .then(({ data }) => set({ isAdmin: data.isAdmin }))
      .catch((err) => console.log(err))
  },
}));