import colors from "colors";
import hsAxiosClient from '../../axios/init.js';

export default async function createHubSpotContent(template) {
    try {
        const { data: createPage } = await hsAxiosClient.post("/cms/v3/pages/site-pages", template);

        console.log(`Page: "${createPage.name}" created successfully!`.brightGreen.bold)

        return createPage
    } catch (e) {
        console.error(e);
        throw new Error(e)
    }
}