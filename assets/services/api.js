import {request} from '../utils/http';
import {errorsToString} from '../utils/errorMap';
import {appConfig} from '../config/app';
import {isNil} from 'lodash';
import axios from 'axios';
export const cancelTokenSource = axios.CancelToken.source();
export function sendLogin(data) {
  //request.defaults.headers.common["Referer"] = appConfig.restBaseUrl+'/login/'
  return request.post(
    '/login/',
    data,
    {
      baseURL: appConfig.restBaseUrl,
    },
  );
}
export function sendGoogleLogin(data) {
  //request.defaults.headers.common["Referer"] = appConfig.restBaseUrl+'/login/'
  return request.post(
    '/google/login/',
    data
  );
}

export function sendSignUp(data) {
  //request.defaults.headers.common["Referer"] = appConfig.restBaseUrl+'/registration/'
  return request.post('/registration/', data,
  {
    baseURL: appConfig.restBaseUrl,
  },);
}

export function getGenders(){
  return request.get('/users/gender/');
}

export function getCountries(){
  return request.get('/users/country/');
}

export function getLifeStyle(){
  return request.get('/questionnaire/life_style/');
}
export function getQuestionary(id){
  return request.get(`/questionnaire/questionnaire/${id}/`);
}

export function getWeightUnit(){
  return request.get('/questionnaire/weight_unit/');
}

export function getHeightUnit(){
  return request.get('/questionnaire/height_unit/');
}

export function getActivityLevels(){
  return request.get('/questionnaire/activity_level/');
}

export function getWorkoutAvailabilities(){
  return request.get('/questionnaire/workout_availability/');
}

export function getQuestionGoals(){
  return request.get('/questionnaire/goal/');
}
export function getQuestionTrainingFor(){
  return request.get('/questionnaire/training_for/');
}

export function updateQuestionaries(payload){
  return request.patch(`/questionnaire/questionnaire/${payload?.id}/`,payload?.data);
}

export function getProfile(){
  return request.get('/users/user_info/me/');
}

export function setProfile(payload){
  return request.patch('/users/user_info/'+payload.id+"/",payload.data);
}
export function updateMacros() {
  return request.post('/users/update_macros/');
}
export function updateFeedback(data) {
  return request.post('/feed_back/',data);
}
  
  export function sendOTP(token) {
    return request.post('/users/verify_reset_token/', {
      token
    });
  }
  
  export function sendForgotPassword(user_email) {
    return request.post(
      '/users/email_reset_token/',
      {
        user_email,
      }
    );
  }

  export function resetPassword(data) {
    return request.post(
      '/users/confirm_password_reset/',
      data
    );
  }

  export function getMeal(payload){
    return request.get('/meals/meals_library/',{params:payload});
  }

  export function getWorkout(payload){
    return request.get('/workouts/exercises_list/',{params:payload});
  }

  export function getTodaysWorkout(){
    return request.get('/workouts/next_workout/');
  }

  export function getMealFilter(){
    return request.get('/meals/meal_filter/');
  }

  export function getMealCategory(){
    return request.get('/meals/meal_category/');
  }

  export function getWorkoutCategory(){
    return request.get('/workouts/exercise_category/');
  }

  export function setMealPlan(payload){
    return request.post('/meals/meal_plan/',payload);
  }

  export function getMealPlan(payload){
    return request.get('/meals/meal_plan/',{params:payload});
  }

  export function getMealByIds(id){
    return request.get(`/meals/meal/${id}/`);
  }

  export function getSubscriptions(){
    return request.get("/membership/subscription_plans/");
  }

  export function beginWorkout(data){
    return request.post("/workouts/workout_subscription/",data);
  }

  export function markMealComplete(data){
    return request.post("/meals/complete_meal/",data);
  }

  export function getSavedCard(){
    return request.get("/membership/payment_method/");
  }

  export function setSavedCard(payload){
    return request.post("/membership/payment_method/",payload);
  }

  export function subscribeNewPlan(payload){
    return request.post("/membership/subscribe/",payload);
  }

  export function createTrainingProgram(payload){
    return request.post("/workouts/training_program/",payload);
  }

  export function getTrainingPlans(){
    return request.get("/workouts/training_program/");
  }