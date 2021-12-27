const request =require("request");
const cheerio =require("cheerio");
const path= require("path");
const url ="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

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
    let innings=$("div.Collapsible");

    /*let htmlString="";
    for(let i=0;i<innings.length;i++){
        htmlString+=$(innings[i]).html();
        
    }
    //console.log(htmlString);
    //htmlString copied to table.html file
    */

    for(let i=0;i<innings.length;i++){

        let teamName=$(innings[i]).find(".header-title.label").text().split("INNINGS")[0].trim();
            
        let battingTable= $(innings[i]).find(".table.batsman");
        let allRows=$(battingTable).find("tbody tr");

        for(let j=0;j<allRows.length;j++){

            
            let allColumns= $(allRows[j]).find("td");
            if($(allColumns[0]).hasClass("batsman-cell")){
                let batsmanName= $(allColumns[0]).text();
                let bdayPageUrl= $(allColumns[0]).find("a").attr("href");
                let fullBdayUrl= "https://www.espncricinfo.com" + bdayPageUrl;
                
                getBdayPage(fullBdayUrl, teamName, batsmanName);

            }
            
            
            
        }

        
    }

}

function getBdayPage(fullBdayUrl, teamName, batsmanName){
    request(fullBdayUrl, cbck);
    function cbck(err, response, html){
        if(err){
            console.error(err);
        }
        else{
            printBday(html, teamName, batsmanName);
        }
    }
}

function printBday(html, teamName, batsmanName){
    let $=cheerio.load(html);
    let playerDetails=$("div.player_overview-grid div");

    let playerBday= $(playerDetails[1]).find("h5").text();

    console.log(`${batsmanName} who plays for ${teamName} was born on ${playerBday}`);
    

}