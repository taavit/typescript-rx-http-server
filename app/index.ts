/**
 * Entry point
 */

import * as http from 'http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NextObserver } from 'rxjs/Observer';

import 'rxjs/add/observable/merge';

import { RequestAction } from './RequestAction';
import { Emitable } from './Emitable';

import { aboutPage } from './pages/aboutPage';
import { welcomePage } from './pages/welcomePage';
import { notFoundPage } from './pages/notFoundPage';

const server: http.Server = http.createServer();

const requests$ = new Subject();

// Push data to RX
server.addListener(
    'request',
    (request, response) => requests$.next(new RequestAction(request, response))
);

// Combine services
const app = Observable.merge<RequestAction>(
        aboutPage(requests$),
        welcomePage(requests$),
        // If all previous routes failed we can return 404 response
        notFoundPage(requests$)
    );

class ResponseEmiter implements NextObserver<RequestAction> {
    public next(action: Emitable) {
        action.emit();
    }
}

const emiter: NextObserver<RequestAction> = new ResponseEmiter();

// Start stream
app.subscribe(emiter);

// Start server
server.listen(3030);
