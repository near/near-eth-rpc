/* This is free and unencumbered software released into the public domain. */

import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 16);

export function requestID() {
    return function(req: any, res: any, next: any) {
        const id = req.headers['x-request-id'] || nanoid();
        req['id'] = id;
        res.set('X-Request-ID', id);
        next();
    };
}