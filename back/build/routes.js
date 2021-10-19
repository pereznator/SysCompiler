"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
class AppRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', controller_1.cont.index);
        this.router.post('/', controller_1.cont.leerEntrada);
    }
}
const appRoutes = new AppRoutes();
exports.default = appRoutes.router;
