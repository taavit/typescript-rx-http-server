/**
 * About Page
 */
import { RequestAction } from '../RequestAction';

import { filter, map } from 'rxjs/operators';

const welcomeView = (action: RequestAction) => {
    action.setBody('<h1>Welcome</h1>');
    return action;
};

// Route
const welcomeRoute = (action: RequestAction) => action.request.url.match(/^\/welcome/) !== null;

// Complete services
export const welcomePage = (requests$) => requests$.pipe(
    filter(welcomeRoute),
    map(welcomeView),
);
