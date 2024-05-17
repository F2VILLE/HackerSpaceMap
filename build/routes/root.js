"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.path = exports.route = void 0;
const express_1 = require("express");
const path = "/";
exports.path = path;
const route = (0, express_1.Router)();
exports.route = route;
route.get("/", (req, res) => {
    res.render("index");
});
