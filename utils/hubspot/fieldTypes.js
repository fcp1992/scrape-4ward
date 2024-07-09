import 'dotenv/config';

/*
{
    "alt": "our-offices",
    "height": 1071,
    "loading": "disabled",
    "max_height": 973.6363636363637,
    "max_width": 2000,
    "size_type": "auto_custom_max",
    "src": "https://20157227.fs1.hubspotusercontent-na1.net/hubfs/20157227/custom-video-thumbnails/our-offices.jpg",
    "width": 2200
}
*/

export const getImageJson = (img) => {
    if (!img) return "";
    if (!process.env.ROOT_URL) throw new Error("Missing env variable ROOT_URL")

    return {
        src: img.src.startsWith("http") ? img.src : process.env.ROOT_URL + img.src,
        alt: img.alt,
        width: img.width,
        width: img.width,
        max_height: img.height,
        max_height: img.height,
        size_type: "auto_custom_max",
        loading: "lazy"
    }
}