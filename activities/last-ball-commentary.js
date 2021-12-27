const request =require("request");
const cheerio =require("cheerio");
const url ="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";

console.log("Scraping the website...\n");

request(url, cb);
function cb(error, response, html){
    if(error){
        console.error(error);
    }
    else{
        handleHTML(html);
    }
}

function handleHTML(html){
    let $= cheerio.load(html);
    let allCommentary=$("div.match-comment-wrapper .match-comment-long-text");
    let lastCommentary= $(allCommentary[0]).text();

    console.log("The last ball commentary was:-\n" + lastCommentary);

}
