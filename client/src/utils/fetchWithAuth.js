import { store } from "../redux/store.js";
import { signOut } from "../redux/user/userSlice.js";
import { persister } from "../redux/store.js";

export const fetchWithAuth = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  if (res.status === 401 || res.status === 403) {
    store.dispatch(signOut());
    await persister.purge();
    window.location.href = "/sign-in";
  }

  return res;
};