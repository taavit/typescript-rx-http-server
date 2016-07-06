/**
 * About Page
 */
import { RequestAction } from '../RequestAction';

const notFoundView = (action: RequestAction) => {
    action.setBody('<h1>Page not found :(</h1>');
    action.setStatusCode(404);
    return action;
};

// Complete services
export const notFoundPage = (requests$) => requests$.map(notFoundView);