/**
 * About Page
 */
import { RequestAction } from '../RequestAction';

const welcomeView = (action: RequestAction) => {
    action.builtResponse.body = '<h1>Welcome</h1>';
    return action;
};

// Routes
const welcomeRoute = (action: RequestAction) => action.request.url.match(/^\/welcome/) !== null;

// Complete services
export const welcomePage = (requests$) => requests$.filter(welcomeRoute).map(welcomeView);