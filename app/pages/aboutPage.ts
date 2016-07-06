/**
 * About Page
 */
import { RequestAction } from '../RequestAction';

// Route
const aboutRoute = (action: RequestAction) => action.request.url.match(/^\/about/) !== null;

// Page
const aboutView = (action: RequestAction) => {
    action.setBody('<h1>About</h1>');
    return action;
};

export const aboutPage = (requests$) => requests$.filter(aboutRoute).map(aboutView);