import axios from 'axios';
import { API_ENDPOINTS } from '../../const/ApiEndpoints';
import {
    SHOWLODER,
    HIDELODER,
    QUESTIONS
} from '../../const/Global';

// FETCH THE QUESTIONS FROM THE URL
export const fetchQuestion = (callback = () => { }) => async (
    dispatch,
) => {
    loadingOn(dispatch);
    try {
        const response = await axios.get(API_ENDPOINTS.QUIZ);
        if (response.status === 200) {
            dispatch({
                type: QUESTIONS,
                payload: response?.data?.results,
            });
            callback();
        }
        return response;
    } catch (e) {
        console.error(e.response, e);
    } finally {
        loadingOff(dispatch);
    }
};

// START THE LOADER 
export const loadingOn = dispatch => {
    dispatch({
        type: SHOWLODER,
    });
};
// STOP THE LOADER
export const loadingOff = dispatch => {
    dispatch({
        type: HIDELODER,
    });
};