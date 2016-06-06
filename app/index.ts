/**
 * Entry point
 */

import * as http from 'http';
import { Subject, Observable } from '@reactivex/rxjs';
import { NextObserver } from '@reactivex/rxjs/src/Observer';
import { RequestAction } from './RequestAction';

import { aboutPage } from './pages/aboutPage';
import { welcomePage } from './pages/welcomePage';

const server = http.createServer();

const requests$ = new Subject();

// Push data to RX
server.addListener(
    'request',
    (request, response) => requests$.next(new RequestAction(request, response))
);

// Combine services
const app = Observable.merge<RequestAction>(
        aboutPage(requests$),
        welcomePage(requests$)
);

class ResponseEmiter implements NextObserver<RequestAction> {
    public next(action: RequestAction) {
        action.emit();
    }
}
const emiter = new ResponseEmiter();

// Start stream
app.subscribe(emiter);

// Start server
server.listen(3030);
