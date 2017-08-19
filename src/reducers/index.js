import { combineReducers } from 'redux';
import pointsReducer from './points.js';

const mapPolygonApp = combineReducers({
    pointsReducer
})

export default mapPolygonApp;