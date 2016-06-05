/**
 * Entry point
 */

import * as http from 'http';
import { Subject, Observable } from '@reactivex/rxjs';

const server = http.createServer();

const requests$ = new Subject();

class RequestAction {
    public request: http.IncomingMessage;
    public response: http.ServerResponse;

    constructor(request: http.IncomingMessage, response: http.ServerResponse) {
        this.request = request;
        this.response = response;
    }
}

// Pages
const aboutPage = (action: RequestAction) => action.response.end('<h1>About</h1>');
const welcomePage = (action: RequestAction) => action.response.end('<h1>Welcome</h1>');

// Routes
const aboutRoute = (action: RequestAction) => action.request.url.match(/^\/about/) !== null;
const welcomeRoute = (action: RequestAction) => action.request.url.match(/^\/welcome/) !== null;

// Complete services
const about = requests$.filter(aboutRoute).map(aboutPage);
const welcome = requests$.filter(welcomeRoute).map(welcomePage);

// Push data to RX
server.addListener(
    'request',
    (request, response) => requests$.next(new RequestAction(request, response))
);


// Combine services
const app = Observable.merge(
    about,
    welcome
);

// Start stream
app.subscribe();

// Start server
server.listen(3030);
