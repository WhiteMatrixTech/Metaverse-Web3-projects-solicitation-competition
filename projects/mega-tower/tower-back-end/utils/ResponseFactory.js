class ResponseFactory {
    constructor(app, req, res, root = "") {
        this.app = app;
        this.req = req;
        this.res = res;
        this.root = root;
    }
}

ResponseFactory.prototype = Object.create(ResponseFactory.prototype);

module.exports = ResponseFactory;
