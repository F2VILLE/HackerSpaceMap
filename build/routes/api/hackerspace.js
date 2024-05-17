"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const spaceapi_1 = require("@f2ville/spaceapi");
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const route = (0, express_1.Router)();
exports.route = route;
let cache = {
    lastUpdated: 0,
    data: [],
};
function fetchList() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default
                .get("https://raw.githubusercontent.com/SpaceApi/directory/master/directory.json")
                .then((response) => {
                console.log("Fetched data from SpaceAPI directory");
                cache = {
                    lastUpdated: Date.now(),
                    data: Object.keys(response.data).map((k) => ({
                        name: k,
                        url: response.data[k],
                    })),
                };
                resolve(Object.keys(response.data).map((k) => ({
                    name: k,
                    url: response.data[k],
                })));
            })
                .catch((error) => {
                reject(error);
            });
        }));
    });
}
route.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.q) {
        return res.status(400).send('Missing query parameter "q"');
    }
    if (cache.data.length < 1 ||
        cache.lastUpdated +
            (process.env.COOLDOWN_FETCH || 2000) <
            Date.now()) {
        console.log("Fetching data");
        yield fetchList();
        console.log("Fetched data");
        console.log(cache.data);
    }
    const filtered = cache.data.filter((x) => x.name
        .toLowerCase()
        .replace(/\s+/gm, "")
        .includes(req.query.q.toLowerCase().replace(/\s+/gm, "")));
    console.log("Filtered", filtered);
    return res.json(filtered);
}));
route.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!cache.data.length) {
        yield fetchList();
    }
    if (fs_1.default.existsSync('hackerspaces.json')) {
        const allSpaces = JSON.parse(fs_1.default.readFileSync('hackerspaces.json').toString());
        return res.json({
            count: allSpaces.spaces.length,
            updatedAt: allSpaces.updatedAt,
            data: allSpaces.spaces
        });
    }
    else {
        return res.json({
            count: 0,
            updatedAt: null,
            data: []
        });
    }
}));
route.get("/space/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.params.name);
    if (!req.params.name) {
        return res.status(400).send('Missing parameter "name"');
    }
    if (!cache.data.length) {
        yield fetchList();
    }
    const url = (_a = cache.data.find((x) => x.name.toLowerCase().replace(/\s+/gm, "") === req.params.name.toLowerCase().replace(/\s+/gm, ""))) === null || _a === void 0 ? void 0 : _a.url;
    console.log(url);
    if (!url) {
        return res.status(404).send("Not found");
    }
    const space = new spaceapi_1.Space(url);
    yield space.fetch({}).then((data) => {
        return res.json(data);
    });
}));
