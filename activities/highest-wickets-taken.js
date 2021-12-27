const request =require("request");
const cheerio =require("cheerio");
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

    //full page search
    let allTeams=$("div.match-header .team");
    let winningTeam= $(allTeams[1]).text();
    let winningTeamName= winningTeam.split("(")[0].trim();

    console.log("The winning team is: " + winningTeamName);

    //shorten the search domain
    let innings=$("div.Collapsible");
    let htmlString="";
    for(let i=0;i<innings.length;i++){
        htmlString+=$(innings[i]).html();
        
    }
    //console.log(htmlString);
    //htmlString copied to table.html file

    for(let i=0;i<innings.length;i++){

        
        let teamName=$(innings[i]).find(".header-title.label").text().split("INNINGS")[0].trim();
        if(teamName==winningTeamName){
            
            let bowlerTable= $(innings[i]).find(".table.bowler");
            let allRows=$(bowlerTable).find("tbody tr");

            let highestWicket=0; 
            let bowlerName="";
            for(let j=0;j<allRows.length;j++){
                let allColumns=$(allRows[j]).find("td");
                let wickets=$(allColumns[4]).text();
                let bowler=$(allColumns[0]).text();

                if(wickets>highestWicket){
                    highestWicket=wickets;
                    bowlerName=bowler;
                }
                
            }

            console.log("The highest wicket was taken by-");
            console.log("Bowler Name: " + bowlerName);
            console.log("Wickets taken: " + highestWicket);
            

        }
    }

}
