/**
 * RequestAction is created to buffer response, and send prepared response on subscribe, so Rx pipeline is used
 * only to prepare response.
 */

import * as http from 'http';
import { ErrorAction } from './ErrorAction';
import { Emitable } from './Emitable';

export class RequestAction implements Emitable {
    public request: http.IncomingMessage;
    public response: http.ServerResponse;
    private handled: boolean;
    private body: string;
    private statusCode: number;

    constructor(request: http.IncomingMessage, response: http.ServerResponse) {
        this.request = request;
        this.response = response;
    }

    public emit() {
        this.response.end(this.body);
    }

    public wasHandled() {
        return this.handled;
    }

    public setBody(body: string) {
        this.handled = true;
        this.body = body;
    }

    public setStatusCode(code: number) {
        this.handled = true;
        this.statusCode = code;
    }

    public createError(message: string, code: number) {
        return new ErrorAction(this.response, message, code);
    }
}

