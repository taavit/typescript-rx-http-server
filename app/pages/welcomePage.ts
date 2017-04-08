/**
 * About Page
 */
import { RequestAction } from '../RequestAction';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

const welcomeView = (action: RequestAction) => {
    action.setBody('<h1>Welcome</h1>');
    return action;
};

// Route
const welcomeRoute = (action: RequestAction) => action.request.url.match(/^\/welcome/) !== null;

// Complete services
export const welcomePage = (requests$) => requests$.filter(welcomeRoute).map(welcomeView);
