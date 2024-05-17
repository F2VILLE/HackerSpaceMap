import { AxiosRequestConfig } from "axios";
import SpaceAPISchema from "../types/SpaceAPISchema";
declare class Space {
    url: string;
    data: SpaceAPISchema;
    constructor(url: string);
    fetch(options: AxiosRequestConfig): Promise<SpaceAPISchema>;
    static findByName(name: string): Promise<Array<{
        name: string;
        url: string;
    }>>;
    get name(): string;
    get contact(): SpaceAPISchema["contact"];
    get location(): SpaceAPISchema["location"];
    get stateOpen(): boolean;
    get stateOpenFull(): SpaceAPISchema["state"];
    get events(): SpaceAPISchema["events"];
    get projects(): SpaceAPISchema["projects"];
    get sensors(): SpaceAPISchema["sensors"];
    get feeds(): SpaceAPISchema["feeds"];
    get logo(): string;
    get stateLogo(): string;
    get space(): SpaceAPISchema["space"];
}
export default Space;
