import create from 'zustand';
import cookies from "js-cookie";

type jwtContentState = {
  token: string
  setJwtToken: (str: string) => void;
  removeJwtToken: () => void;
};

const EDITOR_CONTENT_KEY = 'jwt-token';

export const useEditorJWT = create<jwtContentState>((set,) => ({
  setJwtToken: (newToken) => {
    cookies.set("jwt-token", newToken, { expires: 3 })
    set({token: newToken});
  },
  removeJwtToken: () => {
    cookies.remove(EDITOR_CONTENT_KEY)
    set({ token: '' });
  },
  token: (() => cookies.get(EDITOR_CONTENT_KEY) ?? '')()
}));