import axios from 'axios';
import jsdom from "jsdom";
import https from 'https';
const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
    // No-op to skip console errors.
});

export default async function fetchPage(url) {
    try {
        const { data } = await axios.get(url, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });

        const parser = new JSDOM(data, { virtualConsole });
        const doc = parser.window.document;

        return doc
    } catch (e) {
        console.error(e);
        throw new Error(e)
    }
}