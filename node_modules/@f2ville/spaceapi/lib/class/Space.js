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
const axios_1 = __importDefault(require("axios"));
class Space {
    constructor(url) {
        this.url = url;
        this.data = null;
    }
    fetch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios_1.default
                    .get(this.url, options || {})
                    .then((response) => {
                    this.data = response.data;
                    resolve(response.data);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        });
    }
    static findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios_1.default
                    .get("https://raw.githubusercontent.com/SpaceApi/directory/master/directory.json")
                    .then((response) => {
                    const spaces = response.data;
                    const spacesFound = Object.keys(spaces).filter((key) => key
                        .toLowerCase()
                        .replace(/\s+/gm, "")
                        .includes(name.toLowerCase().replace(/\s+/gm, "")));
                    if (!spacesFound.length)
                        return resolve(null);
                    resolve(spacesFound.map((key) => {
                        return {
                            name: key,
                            url: spaces[key],
                        };
                    }));
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        });
    }
    get name() {
        return this.data.space;
    }
    get contact() {
        return this.data.contact;
    }
    get location() {
        return this.data.location;
    }
    get stateOpen() {
        return this.data.state.open;
    }
    get stateOpenFull() {
        return this.data.state;
    }
    get events() {
        return this.data.events;
    }
    get projects() {
        return this.data.projects;
    }
    get sensors() {
        return this.data.sensors;
    }
    get feeds() {
        return this.data.feeds;
    }
    get logo() {
        return this.data.logo;
    }
    get stateLogo() {
        var _a;
        if (!((_a = this.data.state) === null || _a === void 0 ? void 0 : _a.icon) ||
            !this.data.state.icon.open ||
            !this.data.state.icon.closed)
            return null;
        return this.data.state.open
            ? this.data.state.icon.open
            : this.data.state.icon.closed;
    }
    get space() {
        return this.data.space;
    }
}
exports.default = Space;
//# sourceMappingURL=Space.js.map