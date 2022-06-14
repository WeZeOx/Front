import create from 'zustand';
import axios from "axios";

type adminStore = {
  isAdmin: boolean
  setIsAdmin: () => void;
};

export const useEditorAdmin = create<adminStore>((set,) => ({
  isAdmin: false,
  setIsAdmin: () => {
    axios.get(`http://localhost:3333/api/users/isadmin/`)
      .then(({ data }) => set({ isAdmin: data.isAdmin }))
      .catch((err) => console.log(err))
  },
}));