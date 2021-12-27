# cricinfo-web-scraping
## using nodejs (cheerio module)

### About
This is a web scraping project to obtain required information from [cricinfo website](https://www.espncricinfo.com/)
The following 3 activities are carried out in this project-
1. Print the last ball commentary.
2. Print the name of the winning team and bowler(with name and no. of wickets) who has taken the maximum wickets from the winning team.
3. Print the birthday of every batsmen played.


### How to run this project
1. Clone this repository in your local environment.
2. Run command `npm install` to install all the required packages.
3. Run each file in the activities directory one by one to get desired output.




### Insights-

1. Different files created for implementing different activities.
2. Cheerio module used here for web scraping.
3. Disadvantage of cheerio module: it only parses and extracts initial loaded html, so we cannot find first ball commentary using this.
4. HTML seggregation is done using another file (table.js) to make information extraction easier.
5. Multiple page scraping is done here in printing birthdays of every batsmen.