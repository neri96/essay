import { Mode } from "../../../ts/types";

export interface Value {
    cid: string;
    title: string;
    body: string;
    privacy: Mode,
    category: string;
    preview: {
        name: any;
        file: any;
    }
}