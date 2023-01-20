import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import * as api from '../assets/services/api';
import {errorsToString} from '../assets/utils/errorMap';

export const getMeal = createAsyncThunk(
    'get/meal',
    async (payload, thunkApi) => {
      try {
        const data = await api.getMeal(payload);
        console.log("login==>",payload,data?.data);
        //await thunkApi.dispatch(profileGet(data?.id));
        return data?.data;
      } catch (error) {
        console.log(error);
        throw {
          message: errorsToString(error?.data),
        };
      }
    },
);

export const getWorkout = createAsyncThunk(
  'get/workout',
  async (payload, thunkApi) => {
    try {
      const data = await api.getWorkout(payload);
      console.log("login==>",payload,data?.data);
      //await thunkApi.dispatch(profileGet(data?.id));
      return data?.data;
    } catch (error) {
      console.log(error);
      throw {
        message: errorsToString(error?.data),
      };
    }
  },
);

export const getTrainingPlan = createAsyncThunk(
  "get/training/plan",
  async(payload,thunkApi)=>{
    try {
      const data = await api.getTrainingPlans();
      console.log("login==>",payload,data?.data);
      return data?.data;
    } catch (error) {
      console.log(error);
        throw {
          message: errorsToString(error?.data),
        };
    }
  }
)
export const setTrainingProgram = createAsyncThunk(
  "set/training/program",
  async(payload,thunkApi)=>{
    try {
      const data = await api.createTrainingProgram(payload);
      console.log("set/training/program==>",data?.data);
      return data?.data;
    } catch (error) {
      console.log(error);
        throw {
          message: errorsToString(error?.data),
        };
    }
  }
)

export const getMealFilter = createAsyncThunk(
  'get/mealFliter',
  async (payload, thunkApi) => {
    try {
      const data = await api.getMealFilter();
      console.log("login==>",payload,data?.data);
      //await thunkApi.dispatch(profileGet(data?.id));
      return data?.data;
    } catch (error) {
      console.log(error);
      throw {
        message: errorsToString(error?.data),
      };
    }
  },
);

export const getMealCategoy= createAsyncThunk(
  'get/mealCategory',
  async (payload, thunkApi) => {
    try {
      const data = await api.getMealCategory();
      console.log("login==>",payload,data?.data);
      //await thunkApi.dispatch(profileGet(data?.id));
      return data?.data;
    } catch (error) {
      console.log(error);
      throw {
        message: errorsToString(error?.data),
      };
    }
  },
);

export const getWorkoutCategory= createAsyncThunk(
  'get/workoutCategoy',
  async (payload, thunkApi) => {
    try {
      const data = await api.getWorkoutCategory();
      console.log("login==>",payload,data?.data);
      //await thunkApi.dispatch(profileGet(data?.id));
      return data?.data;
    } catch (error) {
      console.log(error);
      throw {
        message: errorsToString(error?.data),
      };
    }
  },
);

export const setMealPlan = createAsyncThunk(
  'post/mealPlan',
  async (payload, thunkApi) => {
    try {
      const data = await api.setMealPlan(payload);
      console.log("mealPlan==>",payload,data?.data);
      //await thunkApi.dispatch(profileGet(data?.id));
      return data?.data;
    } catch (error) {
      console.log(error);
      throw {
        message: errorsToString(error?.data),
      };
    }
  },
);

export const getMealPlan = createAsyncThunk(
  'get/mealPlan',
  async (payload, thunkApi) => {
    try {
      const data = await api.getMealPlan(payload);
      console.log("mealPlan==>",payload,data?.data);
      //await thunkApi.dispatch(profileGet(data?.id));
      return data?.data;
    } catch (error) {
      console.log(error);
      throw {
        message: errorsToString(error?.data),
      };
    }
  },
);

export const getMealById = createAsyncThunk(
  'get/mealById',
  async (payload, thunkApi) => {
    try {
      const data = await api.getMealByIds(payload);
      console.log("mealPlan==>",payload,data?.data);
      //await thunkApi.dispatch(profileGet(data?.id));
      return data?.data;
    } catch (error) {
      console.log(error);
      throw {
        message: errorsToString(error?.data),
      };
    }
  },
);

export const setWorkoutBegin = createAsyncThunk(
  'set/workout_subscription',
  async (payload, thunkApi) => {
    try {
      const data = await api.beginWorkout(payload);
      console.log("workout_subscription==>",payload,data?.data);
      //await thunkApi.dispatch(profileGet(data?.id));
      return data?.data;
    } catch (error) {
      console.log(error);
      throw {
        message: errorsToString(error?.data),
      };
    }
  },
);

export const setMealComplete = createAsyncThunk(
  'set/setMealComplete',
  async (payload, thunkApi) => {
    try {
      const data = await api.markMealComplete(payload);
      console.log("markMealComplete==>",payload,data?.data);
      //await thunkApi.dispatch(profileGet(data?.id));
      return data?.data;
    } catch (error) {
      console.log(error);
      throw {
        message: errorsToString(error?.data),
      };
    }
  },
);

const initialState = {
  mealRequirementsFilled:false,
  onCreteMeal:false,
  mealIds:[],
  mealPlanStatus:'',
  mealPlanUpdateMethod:null
}
export const slice = createSlice({
    name: 'meal',
    initialState: initialState,
    reducers: {
      reset(state,action){
        state = initialState;
        return state;
      },
     updateCrealMealPage(state,action){
      state.onCreteMeal = action?.payload;
      return state;
     },
     updateCrealMealRequirement(state,action){
      state.mealRequirementsFilled = action?.payload;
      return state;
     },
     updateMealIds(state,action){
      state.mealIds = [...action?.payload];
      return state;
     },
     addMealPlanMethod(state,action){
      state.mealPlanUpdateMethod = action?.payload
      return state;
     },
     updateMealPlanStatus(state,action){
      state.mealPlanStatus="";
      return state;
     }
    },
    extraReducers: {
     [setMealPlan.pending]:(state,action)=>{
      state.mealPlanStatus = 'loading'
      },
      [setMealPlan.fulfilled]:(state,action)=>{
        state.mealPlanStatus = 'done';
        state.mealRequirementsFilled=false;
        state.onCreteMeal=false;
      },
      [setMealPlan.rejected]:(state,action)=>{
        state.mealPlanStatus = 'reject'
      }
    },
  });

  export default slice.reducer;

  export const {updateMealPlanStatus,reset,updateCrealMealPage,updateCrealMealRequirement,updateMealIds,addMealPlanMethod} = slice.actions;