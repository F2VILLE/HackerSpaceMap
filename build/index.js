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
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const fetchAllHackerspaces_1 = require("./utils/fetchAllHackerspaces");
const app = (0, express_1.default)();
const port = 80;
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "views"));
app.use("/", express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
function fetchHackerspacesLoop() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, fetchAllHackerspaces_1.fetchAllHackerspaces)();
        fetchHackerspacesLoop();
    });
}
fetchHackerspacesLoop();
routes_1.default.load(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
