import authReducer from '../slices/authSlice';
import mealReducer from '../slices/mealSlice';
export const reducer = {
    auth:authReducer,
    meal:mealReducer
}