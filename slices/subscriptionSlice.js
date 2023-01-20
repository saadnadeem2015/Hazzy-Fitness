import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../assets/services/api';
import {errorsToString} from '../assets/utils/errorMap';

export const getSubscriptionPlans = createAsyncThunk('get/SubscriptionPlans',async (payload, thunkApi)=>{
    try {
        const data = await api.getSubscriptions();
        console.log("SubscriptionPlans==>",data?.data);
        return data?.data;
    } catch (error) {
        console.log(error);
        throw {
            message: errorsToString(error?.data),
        };
    }
});

export const getPreviousCards = createAsyncThunk('get/previousSavedCards',async (payload, thunkApi)=>{
    try {
        const data = await api.getSavedCard();
        console.log("SubscriptionPlans==>",data?.data);
        return data?.data;
    } catch (error) {
        console.log(error);
        throw {
            message: errorsToString(error?.data),
        };
    }
});

export const setNewCards = createAsyncThunk('post/setNewCards',async (payload, thunkApi)=>{
    try {
        const data = await api.setSavedCard(payload);
        return data?.data;
    } catch (error) {
        console.log(error);
        throw {
            message: errorsToString(error?.data),
        };
    }
});

export const subscribePlan = createAsyncThunk('post/subscribePlan',async (payload, thunkApi)=>{
    try {
        const data = await api.subscribeNewPlan(payload);
        return data?.data;
    } catch (error) {
        console.log(error);
        throw {
            message: errorsToString(error?.data),
        };
    }
});

const initialState = {
  }
export const slice = createSlice({
    name: 'meal',
    initialState: initialState,
    reducers: {},
    extraReducers: {
    },
  });
export default slice.reducer;