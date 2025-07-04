declare module 'swagger-ui-express' {
    import { RequestHandler } from 'express';
    const serve: RequestHandler[];
    function setup(swaggerDoc: object, options?: object): RequestHandler;
    export { serve, setup };
}
