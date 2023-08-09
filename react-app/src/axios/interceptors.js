// eslint-disable-next-line import/no-cycle
import store from "../app/store";
import { refreshToken } from "../views/redux/Auth/authSlice";
// import * as authActions from "../redux/actions/auth.actions";


export const addAccessToken = async (config) => {
  const state = store.getState();
  const { user } = state.auth;
  const { accessToken } = user;

  if (!accessToken) {
    await store.dispatch(refreshToken());
  } else {
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json"
      },
    };
  }
};

export const handleRequestError = (error) => Promise.reject(error);

export const handleResponseOK = (response) => response;

export const handleResponseError = (error) => {
  // console.log("handleResponseError", error);
  if (error.response?.status === 401) {
    // return handleRefreshToken(error.config);
  }
  return Promise.reject(error);
};

export const addInterceptors = (instance) => {
  instance.interceptors.request.use(addAccessToken, handleRequestError);
  instance.interceptors.response.use(handleResponseOK, handleResponseError);
};
