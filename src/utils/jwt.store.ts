import create from 'zustand';

export type jwtContentState = {
  token: string
  getJwtToken: () => string;
  setJwtToken: (str: string) => void;
  removeJwtToken: () => void;
};

const EditorContentLocalStorageKey = 'jwt-token';

export const useEditorJWT = create<jwtContentState>((set) => ({
  getJwtToken: () => localStorage.getItem(EditorContentLocalStorageKey) ?? '',
  setJwtToken: (str) => {
    localStorage.setItem(EditorContentLocalStorageKey, str);
    set({token: str});
  },
  removeJwtToken: () => {
    localStorage.removeItem(EditorContentLocalStorageKey);
    set({ token: '' });
  },
  token: (() => localStorage.getItem(EditorContentLocalStorageKey) ?? '')()
}));