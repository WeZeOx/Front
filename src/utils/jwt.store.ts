import create from 'zustand';
import cookies from "js-cookie";

export type jwtContentState = {
  token: string
  getJwtToken: () => string;
  setJwtToken: (str: string) => void;
  removeJwtToken: () => void;
};

const EditorContentLocalStorageKey = 'jwt-token';

export const useEditorJWT = create<jwtContentState>((set) => ({
  getJwtToken: () => cookies.get(EditorContentLocalStorageKey) ?? '',
  setJwtToken: (str) => {
    cookies.set("jwt-token", str, { expires: 3 })
    set({token: str});
  },
  removeJwtToken: () => {
    cookies.remove(EditorContentLocalStorageKey)
    set({ token: '' });
  },
  token: (() => cookies.get(EditorContentLocalStorageKey) ?? '')()
}));