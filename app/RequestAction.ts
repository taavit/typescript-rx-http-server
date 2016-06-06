/**
 * Request Action
 */
import * as http from 'http';

export class RequestAction {
    public request: http.IncomingMessage;
    public response: http.ServerResponse;
    public builtResponse: TfResponse;

    constructor(request: http.IncomingMessage, response: http.ServerResponse) {
        this.request = request;
        this.response = response;
        this.builtResponse = new TfResponse();
    }

    public emit() {
        this.response.end(this.builtResponse.body);
    }
}

export class TfResponse {
    public body: string;
}
