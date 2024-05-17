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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllHackerspaces = void 0;
const spaceapi_1 = require("@f2ville/spaceapi");
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
function fetchAllHackerspaces() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default
                .get("https://raw.githubusercontent.com/SpaceApi/directory/master/directory.json")
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                var _a, e_1, _b, _c;
                const hsurls = Object.keys(response.data).map((k) => ({
                    name: k,
                    url: response.data[k],
                }));
                const allSpaces = [];
                const colors = {
                    red: "\x1b[31m",
                    green: "\x1b[32m",
                    yellow: "\x1b[33m",
                    blue: "\x1b[34m",
                    magenta: "\x1b[35m",
                    cyan: "\x1b[36m",
                    white: "\x1b[37m",
                    reset: "\x1b[0m",
                };
                try {
                    for (var _d = true, hsurls_1 = __asyncValues(hsurls), hsurls_1_1; hsurls_1_1 = yield hsurls_1.next(), _a = hsurls_1_1.done, !_a; _d = true) {
                        _c = hsurls_1_1.value;
                        _d = false;
                        const space = _c;
                        const spaceObj = new spaceapi_1.Space(space.url);
                        yield spaceObj.fetch({
                            timeout: 6000
                        }).then((data) => {
                            console.log(`${colors.green}[${hsurls.indexOf(space)}/${hsurls.length}]${colors.reset}`, "Fetched data from", space.name, "at", space.url);
                            allSpaces.push(data);
                        })
                            .catch((err) => {
                            console.log(`${colors.red}[${hsurls.indexOf(space)}/${hsurls.length}]${colors.reset} Error fetching data from ${space.name} at {space.url}`);
                            // console.error(err)
                        });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = hsurls_1.return)) yield _b.call(hsurls_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                fs_1.default.writeFileSync('hackerspaces.json', JSON.stringify({
                    updatedAt: Date.now(),
                    spaces: allSpaces
                }, null, 2));
                resolve(allSpaces);
            }))
                .catch((error) => {
                reject(error);
            });
        }));
    });
}
exports.fetchAllHackerspaces = fetchAllHackerspaces;
