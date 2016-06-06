/**
 * About Page
 */
import { RequestAction } from '../RequestAction';

const aboutRoute = (action: RequestAction) => action.request.url.match(/^\/about/) !== null;

const aboutView = (action: RequestAction) => {
    action.builtResponse.body = '<h1>About</h1>';
    return action;
};

export const aboutPage = (requests$) => requests$.filter(aboutRoute).map(aboutView);