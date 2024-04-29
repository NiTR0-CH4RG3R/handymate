import { RequestHandler, Request, Response } from "express";

enum Method {
    GET, POST, PUT, DELETE
}

interface Endpoint {
    method: Method;

    path: string;

    roles: number[];

    handler: RequestHandler;
}

class Controller {
    private endpoints: Map<string, Endpoint>;
    private baseRoute: string;

    public constructor(baseRoute: string) {
        this.endpoints = new Map<string, Endpoint>();
        this.baseRoute = baseRoute;

        // if the base route does not start with a '/', add it
        if (!this.baseRoute.startsWith("/")) {
            this.baseRoute = "/" + this.baseRoute;
        }

        this.baseRoute = this.baseRoute.replace(/[^a-zA-Z0-9_\/]/g, "_");

    }

    private joinPath(path: string): string {
        // if the path is empty, return the base route
        if (!path) {
            return this.baseRoute;
        }

        // if the path does not start with a '/', add it
        if (!path.startsWith("/")) {
            path = "/" + path;
        }

        // if the path ends with a '/', remove it
        if (path.endsWith("/")) {
            path = path.substring(0, path.length - 1);
        }

        // if the path has invalid characters except for '/', ':', and '_', replace them with a '_' character
        path = path.replace(/[^a-zA-Z0-9_\/:]/g, "_");

        // return the joined path
        return this.baseRoute + path;
    }

    static generateKey(method: Method, path: string): string {
        return `${method.toString()}_${path}`;
    }

    public addEndpoint(endpoint: Endpoint): void;
    public addEndpoint(method: Method, handler: RequestHandler): void;
    public addEndpoint(method: Method, roles: number[], handler: RequestHandler): void;
    public addEndpoint(method: Method, path: string, handler: RequestHandler): void;
    public addEndpoint(method: Method, path: string, roles: number[], handler: RequestHandler): void;

    public addEndpoint(
        methodOrEndpoint: Method | Endpoint,
        rolesOrPathOrHandler?: number[] | string | RequestHandler,
        rolesOrHandler?: number[] | RequestHandler,
        handler?: RequestHandler
    ): void {

        // Just helper functions to determine the types of the arguments
        const isEndpoint = (arg: any): arg is Endpoint => {
            return (arg as Endpoint).handler !== undefined && (arg as Endpoint).method !== undefined && (arg as Endpoint).path !== undefined;
        };

        const isHandler = (arg: any): arg is RequestHandler => {
            return typeof arg === "function";
        };

        const isRoles = (arg: any): arg is number[] => {
            return Array.isArray(arg);
        };

        const isPath = (arg: any): arg is string => {
            return typeof arg === "string";
        }

        // if the first argument is an endpoint
        if (isEndpoint(methodOrEndpoint)) {
            let endpoint = methodOrEndpoint as Endpoint;
            endpoint.path = this.joinPath(endpoint.path);
            let key = Controller.generateKey(endpoint.method, endpoint.path);
            this.endpoints.set(key, endpoint);
            return;
        }

        // Now the first argument is always a method
        let _method = methodOrEndpoint as Method;
        let _path = "";
        let _roles: number[] = [];
        let _handler: RequestHandler = () => { };

        // if the second argument is a handler
        if (isHandler(rolesOrPathOrHandler)) {
            _handler = rolesOrPathOrHandler;
        }

        // if the second argument is a path
        if (isPath(rolesOrPathOrHandler)) {
            _path = rolesOrPathOrHandler;
        }

        // if the second argument is roles
        if (isRoles(rolesOrPathOrHandler)) {
            _roles = rolesOrPathOrHandler;
        }

        // if the third argument is a handler
        if (rolesOrHandler && isHandler(rolesOrHandler)) {
            _handler = rolesOrHandler;
        }

        // if the third argument is roles
        if (rolesOrHandler && isRoles(rolesOrHandler)) {
            _roles = rolesOrHandler;
        }

        // if the fourth argument is a handler
        if (handler) {
            _handler = handler;
        }

        _path = this.joinPath(_path);

        let key = Controller.generateKey(_method, _path);

        this.endpoints.set(key, {
            method: _method,
            path: _path,
            roles: _roles,
            handler: _handler
        });
    }

    // public addEndpoint(endpointOrMethod: Endpoint | Method, path?: string, handler?: RequestHandler, roles?: number[]): void {
    //     let endpoint: Endpoint = endpointOrMethod as Endpoint;
    //     if (endpoint.handler && endpoint.method && endpoint.path) {
    //         endpoint.path = this.joinPath(endpoint.path);

    //         let key = `${endpoint.method.toString()}_${endpoint.path}`;

    //         this.endpoints.set(key, endpoint);
    //     } else {
    //         if (handler) {
    //             let joinedPath = this.joinPath(path);
    //             let key = `${(endpointOrMethod as Method).toString()}_${joinedPath}`;

    //             this.endpoints.set(key, {
    //                 method: endpointOrMethod as Method,
    //                 path: joinedPath,
    //                 roles: roles,
    //                 handler: handler
    //             });
    //         }
    //     }
    // }

    // this method is used to get an endpoint by method and path
    // primarily used in the testing the handler of an endpoint
    public getEndpoint(method: Method, path: string): Endpoint | undefined {
        let key = Controller.generateKey(method, this.joinPath(path));
        return this.endpoints.get(key);
    }

    public getEndpoints(): Endpoint[] {
        return Array.from(this.endpoints.values());
    }
}

export default Controller;
export { Method, Endpoint };