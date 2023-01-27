import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import * as api from '../assets/services/api';
import {errorsToString} from '../assets/utils/errorMap';
import {appConfig} from '../assets/config/app';
import { setCredentials } from '../assets/utils/keyStorage';
import {updateAccessKey} from '../assets/utils/http';

export const authSignIn = createAsyncThunk(
    'auth/signIn',
    async (payload, thunkApi) => {
      try {
        const data = await api.sendLogin(payload);
        console.log("login==>",payload,data?.data);
        await setCredentials(appConfig.tokenSlugs.access, 'access', data?.data?.key);
        await updateAccessKey();
        //await thunkApi.dispatch(profileGet(data?.id));
        return data?.data?.user;
      } catch (error) {
        console.log(error);
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const authGoogleSignIn = createAsyncThunk(
    'auth/google/signIn',
    async (payload, thunkApi) => {
      try {
        const data = await api.sendGoogleLogin(payload);
        console.log("login==>",payload,data?.data);
        await setCredentials(appConfig.tokenSlugs.access, 'access', data?.data?.key);
        await updateAccessKey();
        //await thunkApi.dispatch(profileGet(data?.id));
        return data?.data?.user;
      } catch (error) {
        console.log(error?.data);
        if(error?.data!=undefined){
          throw error?.data
        } else {
          throw error;
        }
        
      }
    },
  );

  export const authSignUp = createAsyncThunk(
    "auth/signUp",
    async (payload, thunkApi) => {
      try {
        const data = await api.sendSignUp(payload);
        await setCredentials(appConfig.tokenSlugs.access, 'access', data?.data?.key);
        await updateAccessKey();
        return data?.data;
      } catch (error) {
        console.log(error, ' is error');
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const getTodaysWorkout = createAsyncThunk('auth/getTodaysWorkout',
  async(payload,thunkApi)=>{
    try {
      const response = await api.getTodaysWorkout(payload);
      return response?.data;
    } catch (error) {
      console.log(error, ' is error');
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: error?.data,
        };
    }
  })

  export const authProfile = createAsyncThunk('auth/profile',
  async(payload,thunkApi)=>{
    try {
      const response = await api.getProfile(payload);
      return response?.data;
    } catch (error) {
      console.log(error, ' is error');
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: error?.data,
        };
    }
  })

  export const setAuthProfile = createAsyncThunk('set/auth/profile',
  async(payload,thunkApi)=>{
    try {
      const response = await api.setProfile(payload);
      return response?.data;
    } catch (error) {
      console.log(error, ' is error');
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: error?.data,
        };
    }
  })

  export const authForgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (user_email, thunkApi) => {
      try {
        const response = await api.sendForgotPassword(user_email);
        return response.data;
      } catch (error) {
        console.log("Error===>",error);
        if (error.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error.data),
        };
      }
    },
  );

  export const authVerifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async (token, thunkApi) => {
      try {
        const response = await api.sendOTP(token);
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const authResetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (data, thunkApi) => {
      try {
        const response = await api.resetPassword(data);
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const getGender = createAsyncThunk(
    'auth/getGender',
    async (data, thunkApi) => {
      try {
        const response = await api.getGenders();
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const getCountry = createAsyncThunk(
    'auth/getGender',
    async (data, thunkApi) => {
      try {
        const response = await api.getCountries();
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const getLifeStyle = createAsyncThunk(
    'auth/getLifeStyle',
    async (data, thunkApi) => {
      try {
        const response = await api.getLifeStyle();
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const getQuestionary = createAsyncThunk(
    'auth/getQuestionary',
    async (id, thunkApi) => {
      try {
        const response = await api.getQuestionary(id);
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const getActivityLevel = createAsyncThunk(
    'auth/getActivityLevel',
    async (data, thunkApi) => {
      try {
        const response = await api.getActivityLevels();
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const getWorkoutAvailability = createAsyncThunk(
    'auth/getWorkoutAvailability',
    async (data, thunkApi) => {
      try {
        const response = await api.getWorkoutAvailabilities();
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const getQuestionGoal = createAsyncThunk(
    'auth/getQuestionGoal',
    async (data, thunkApi) => {
      try {
        const response = await api.getQuestionGoals();
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const getTrainingFor = createAsyncThunk(
    'auth/getTrainingFor',
    async (data, thunkApi) => {
      try {
        const response = await api.getQuestionTrainingFor();
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const updateQuestionary = createAsyncThunk(
    'auth/updateQuestionary',
    async (data, thunkApi) => {
      try {
        const response = await api.updateQuestionaries(data);
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const getHeightUnit = createAsyncThunk(
    'auth/getHeightUnit',
    async (data, thunkApi) => {
      try {
        const response = await api.getHeightUnit();
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );

  export const getWeightUnit = createAsyncThunk(
    'auth/getHeightUnit',
    async (data, thunkApi) => {
      try {
        const response = await api.getWeightUnit();
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  );
  
  export const updateMacros = createAsyncThunk(
    'auth/updateMacros',
    async (data, thunkApi) => {
      try {
        const response = await api.updateMacros();
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  ); 

  export const sendFeedback = createAsyncThunk(
    'auth/sendFeedback',
    async (data, thunkApi) => {
      try {
        const response = await api.updateFeedback(data);
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.status === 500) {
          throw {
            message: 'Something went wrong',
          };
        }
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
  ); 



  export const slice = createSlice({
    name: 'auth',
    initialState: {
      me: null,
    },
    reducers: {
      logout: state => {
        //resetCredentials();
        updateAccessKey();
        state.me = null;
      },
      updateProfile:(state,action)=>{
        state.me = action.payload
      }
    },
    extraReducers: {
      /* [authSignIn.fulfilled]: (state, action) => {
        state.me = {
          ...action?.payload,
          key: undefined,
        };
      }, */
      [authProfile.fulfilled]:(state,action)=>{
        state.me = {
          ...action.payload,
          key: undefined,
        }
      },
      [setAuthProfile.fulfilled]:(state,action)=>{
        state.me = {
          ...action.payload,
          key: undefined,
        }
      }
    },
  });

export const {logout,updateProfile} = slice.actions;
export default slice.reducer;