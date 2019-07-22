/**
 * About Page
 */
import { RequestAction } from '../RequestAction';

import { filter, map } from 'rxjs/operators';

// Route
const aboutRoute = (action: RequestAction) => action.request.url.match(/^\/about/) !== null;

// Page
const aboutView = (action: RequestAction) => {
    action.setBody('<h1>About</h1>');
    return action;
};

export const aboutPage = (requests$) => requests$.pipe(
    filter(aboutRoute),
    map(aboutView),
);