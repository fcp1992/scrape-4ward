import samplePage from "../templates/sample-page.js";
import fetchPage from "../utils/fetchPage.js";
import getUrlsFromCsv from "../utils/getUrlsFromCsv.js";
import createHubSpotContent from "../utils/hubspot/createHubSpotContent.js";
import { getImageJson } from "../utils/hubspot/fieldTypes.js"

// 0 - Get URLs from CSV
const csv = await getUrlsFromCsv("contents/sample.csv");

// 1 - Scrape URLs
csv.forEach(async ({ url }) => {
    const document = await fetchPage(url);

    console.log(document.querySelector("h1")?.textContent);
    console.log(document.querySelector(".success-case-content").innerHTML);

    // 2 - Search for content in page
    /*
        const page = {
            h1: document.querySelector("h1")?.textContent || "",
            metaTitle: document.querySelector("title")?.textContent || "",
            metaDescription: document.querySelector("meta[name='description']")?.content || "",
            slug: document.querySelector("link[rel='canonical']")?.href?.replace("https://www.arneg.com.br/en", "") || "",
            lang: document.querySelector("html")?.lang,
            image: getImageJson(document.querySelector(".page_content_offset img"))
        };
    
        // 3 - Create page in HubSpot
        await createHubSpotContent(samplePage(page));*/
})