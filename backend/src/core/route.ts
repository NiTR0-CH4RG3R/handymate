import { Router, RouterOptions } from 'express';
import Controller, { Method, Endpoint } from './controller';

class Route {
    private router: Router;

    public constructor(controller: Controller) {
        this.router = Router();


        controller.getEndpoints().forEach((endpoint: Endpoint) => {

            switch (endpoint.method) {
                case Method.GET:
                    this.router.get(endpoint.path, endpoint.handler);
                    break;
                case Method.POST:
                    this.router.post(endpoint.path, endpoint.handler);
                    break;
                case Method.PUT:
                    this.router.put(endpoint.path, endpoint.handler);
                    break;
                case Method.DELETE:
                    this.router.delete(endpoint.path, endpoint.handler);
                    break;
            }
        });

    }

    public getRouter() {
        return this.router;
    }
}

export default Route;