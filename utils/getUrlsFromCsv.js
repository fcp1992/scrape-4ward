import csv from "csvtojson"

export default async function getUrlsFromCsv(csvPath) {
    try {
        return await csv().fromFile(csvPath)
    } catch (e) {
        console.error(e)
        throw new Error(e)
    }
}