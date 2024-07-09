import samplePage from "../templates/sample-page.js";
import fetchPage from "../utils/fetchPage.js";
import getUrlsFromCsv from "../utils/getUrlsFromCsv.js";
import createHubSpotContent from "../utils/hubspot/createHubSpotContent.js";
import { getImageJson } from "../utils/hubspot/fieldTypes.js";
import fs from "fs";
import { parse } from "json2csv";

// 0 - Get URLs from CSV
const csv = await getUrlsFromCsv("contents/sample.csv");

// Funzione per convertire i dati in CSV e scriverli su un file
const writeCsv = (data, path) => {
  try {
    const csv = parse(data);
    fs.writeFileSync(path, csv);
  } catch (err) {
    console.error(err);
  }
};

// Array per memorizzare i dati estratti
const data = [];

// 1 - Scrape URLs
for (const { url } of csv) {
  const document = await fetchPage(url);

  // 2 - Search for content in page
  const page = {
    h1: document.querySelector("h1")?.textContent || "",
    metaTitle: document.querySelector("title")?.textContent || "",
    metaDescription:
      document.querySelector("meta[name='description']")?.content || "",
    slug:
      document
        .querySelector("link[rel='canonical']")
        ?.href?.replace("https://www.4ward.it", "") || "",
    successCaseContent:
      document.querySelector(".success-case-content")?.innerHTML || "",
    successCaseSidebar:
      document.querySelector(".success-case-sidebar")?.innerHTML || "",
  };

  // Aggiungi i dati al tuo array
  data.push(page);

  /*// 3 - Create page in HubSpot
await createHubSpotContent(samplePage(page));*/
}

// Scrivi i dati nel file CSV
writeCsv(data, "output.csv");
