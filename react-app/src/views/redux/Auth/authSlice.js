/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, secure_instance } from "../../../axios/axios-config";
import { getCookie, setCookie } from "../../../utilities/utils";

// Create an initial state for the auth slice
const initialState = {
  user: {
    accessToken: null,
    userId: null,
    role: null,
    userCompanyId: null,
  },
  isRegistered: false,
  isLoggedInState: false,
  loading: false,
  error: null,
};

// Asynchronous action to handle login
export const handleRegister = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.request({
        url: "/api/companies/",
        method: "Post",
        data,
      });
      // window.location.replace("/");
      return response.data; // Assuming your loginAPI returns data with access_token, user_id, and role_id
    } catch (err) {
      // Handle login error here if needed
      return rejectWithValue(err.response.data);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await instance.request({
        url: "/api/token/?accept=application/json",
        method: "Post",
        data: {
          email,
          password,
        },
      });
      setCookie("refresh_token", response.data.refresh, 7);

      return response.data; // Assuming your loginAPI returns data with access_token, user_id, and role_id
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk("auth/refresh", async () => {
  const request = await instance.request({
    url: "/api/token/refresh/",
    method: "Post",
    data: {
      refresh: getCookie("refresh_token"),
    },
  });
  return request.data;
  // if (
  //   !request?.data?.is_active &&
  //   !window.location.href.includes("activation")
  // ) {
  //   window.location.href = "/activation";
  // }
  // if (
  //   !request?.data?.subscription_status &&
  //   !window.location.href.includes("subscription") &&
  //   !window.location.href.includes("paymentinfo")
  // ) {
  //   window.location.href = "/subscription";
  // }
  // dispatch({
  //   type: is_anonymous_refresh
  //     ? HANDLE_ANON_REFRESH_TOKEN
  //     : HANDLE_REFRESH_TOKEN,
  //   payload: request.data,
  // });
});

export const getAuthenticatedUser = createAsyncThunk(
  "auth/authenticatedUser",
  async () => {
    const response = await secure_instance.request({
      url: "/api/users/me/",
      method: "GET",
    });
    return response.data;
  }
);

// Create the loginSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleResgisterationStatus: (state) => {
      state.isRegistered = false;
    },
    handleLoginStatusFalse: (state) => {
      state.isLoggedInState = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false;
        const { access, user } = action.payload;
        state.user.accessToken = access;
        state.user.userId = user.id;
        state.user.role = user.role_type;
        state.isLoggedInState = true;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        // console.log(action);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handleRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = true;
        // show login view
        // toggleLoginView());
        // hide register view
        // toggleRegisterView());
        // const { access, user } = action.payload;
        // state.user.accessToken = access;
        // state.user.userId = user.id;
        // state.user.role = user.role;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        const { access } = action.payload;
        // state.loading = false;
        // state.error = action.error.message;
        state.user.accessToken = access;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      })
      .addCase(getAuthenticatedUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.user.userId = data.id;
        state.user.role = data.role_type;
        state.user.userCompanyId = data.user_company.id;
        // state.loading = false;
        // state.error = action.error.message;
        // state.user.accessToken = access;
      })
      .addCase(getAuthenticatedUser.rejected, (state, action) => {
        const { access } = action.payload;
        console.log("getAuthenticatedUser.rejected", action.payload);
        // state.loading = false;
        // state.error = action.error.message;
        // state.user.accessToken = access;
      });
    // .addCase(refreshToken.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(refreshToken.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const { access_token, user_id, role_id } = action.payload;
    //   state.user.accessToken = access_token;
    //   state.user.userId = user_id;
    //   state.user.role = role_id;
    // })
    // .addCase(refreshToken.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export const { handleResgisterationStatus, handleLoginStatusFalse } =
  authSlice.actions;

// Export the reducer and actions
export default authSlice.reducer;
