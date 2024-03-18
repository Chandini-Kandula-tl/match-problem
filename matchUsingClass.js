/* [❓#1] The Cricket Match
You need to implement a class Match which obeys following properties
You need to ask the user
Number of overs
Team-1 Name, players count of that team
Team-2 Name, players count of that team
Wide ball extra runs
No ball extra runs
Toss and elected to bat/field
Start an innings, End an innings
A Match has the following properties
winners
Should return a winning team with wining criteria like win by wicket or by runs
if win by wicket <Team Name> Won the match by <x> wickets
if win by runs <Team Name> Won the match by <x> runs
if match is not ended return MATCH IN PROGRESS >
exportStats
You need to write the match statistics to a file
No need to have tables
Save The data to Statistics.txt file
Match Statistics as follows
+----------------------------+
| Match statistics           |
+----------------------------+
|<Match Status>              |
+----------------------------+
| <Match Overs>              |
+----------------------------+
| <Team Name>                |
+----------+-----------------+
| Runs     | <Runs Scored>   |
+----------+-----------------+
| Over     | <Overs Played>  |
+----------+-----------------+
| Wickets  | <Wickets Lost>  |
+----------+-----------------+
| Extras   | <Extra for Inn> |
+----------+-----------------+
| Run Rate | <RR for Inn>    |
+----------+-----------------+
Example
Match statistics

Team INDIA Won the Match

5 overs match

Team INDIA

RUNS 50
OVERS 5
WICKETS 3
EXTRAS 4
RUN RATE 7.5

Team PAK

RUNS 47
OVERS 5
WICKETS 2
EXTRAS 2
RUN RATE 7
Constraints
Overs

You need use previously used Over class in Assignment 10
End of innings

If N-1 player's of a team out innings will be End
If Number of overs of matches completed innings will End
Players count

Players per team should min 5 and max 11
Both teams should have equal number of players
exportStats

Match status
When match completed - <Team Name> Won the match
When match not stated - Match Not Started
When 1st innings completed - 1st innings completed
When Innings in process - Match In Progress
If you don't have stats data, place value - as a value for that filed
You can alter the Over accordingly for your requirements
*/

class Constants {
    static WICKET = "wick";
    static VALID = "valid";
    static WIDE = "wide";
    static NOBALL = "noball";
    static UNDO = "undo";
    static EXIT = "exit";
    static RUNRATE = "RR";
    static RUNOVER = "RO";
    static RUNRATEVALIDBALL = "RRVB";
    static RUN = "R";
    static WD = "wd";
    static N = "n";
}

Object.freeze(Constants);

class Ball {
    constructor() {
        this.ballType = "";
        this.runs = 0;
        this.extraRuns = 0;
    }
}

class Match {
    constructor() {
        this.matchStatus = 0;
        this.noOfOvers = 0;
        this.wideBall = 0;
        this.noBall = 0;
        this.firstInnings = new Innings()
        this.secondInnings = new Innings()

    }

    getExtraRuns(ball) {
        let calculateExtraRuns = { [Constants.WD]: this.wideBall, [Constants.N]: this.noBall };
        return calculateExtraRuns?.[ball] || 0
    }

    exportStats() {
        if (this.matchStatus === 0) {
            console.log("match is not yet started");
        }
        else if (this.matchStatus === 1) {
            console.log("match is in progress");
        }
        else {
            console.log("match is completed");
        }
        console.log('Match Statistics');
        console.log(`Team : ${this.firstInnings.teamName}`);
        console.log(`Runs: ${this.firstInnings.teamRuns}`);
        console.log(`wickets : ${this.firstInnings.teamWickets}`);
        console.log(`extra runs : ${this.firstInnings.teamExtraRuns}`);
        console.log(`Overs: ${this.noOfOvers}`);
        console.log(`Team : ${this.secondInnings.teamName}`);
        console.log(`Runs: ${this.secondInnings.teamRuns}`);
        console.log(`wickets : ${this.secondInnings.teamWickets}`);
        console.log(`extra runs : ${this.secondInnings.teamExtraRuns}`);
        console.log(`Overs: ${this.noOfOvers}`);
    }

    printResult() {
        if (this.firstInnings.teamRuns > this.secondInnings.teamRuns) {
            console.log(this.firstInnings.teamName + " won the match");
        }
        else {
            console.log(this.secondInnings.teamName + " won the match");
        }
    }

    getInput() {
        const prompt = require('prompt-sync')();

        let numberOfOvers = prompt("Enter number of overs: ");
        this.noOfOvers = numberOfOvers;
        let teamName1 = prompt("Enter team 1 name: ").toLowerCase();
        let teamName2 = prompt("Enter team 2 name: ").toLowerCase();
        let team1Count = Number(prompt("Enter team 1 players count: "));
        this.firstInnings.teamPlayersCount = team1Count;

        if (team1Count >= 5 && team1Count <= 11) {
            let team2Count = Number(prompt("Enter team 2 players count: "));
            this.secondInnings.teamPlayersCount = team2Count;

            if (team1Count !== team2Count) {
                console.log("In both teams, players should be equal");
            } else {
                let wideBallRun = prompt("Enter extra runs for wide ball: ");
                this.wideBall = wideBallRun;
                let noBallRun = prompt("Enter extra runs for No ball: ");
                this.noBall = noBallRun;
                let team1Toss = prompt("Enter head / tail by team1: ").toLowerCase();
                let toss = ["head", "tail"];
                let tossValue = toss[Math.floor(Math.random() * toss.length)];
                if (team1Toss === tossValue) {
                    console.log("Team 1 won the toss");
                    var selection = prompt("Do you want bating / bowling: ").toLowerCase();
                    console.log("Match will start now");
                    if (selection === "bating") {
                        this.firstInnings.teamName = teamName1;
                        this.secondInnings.teamName = teamName2;
                        console.log("First innings bating is " + this.firstInnings.teamName);
                        console.log("second innings bating is " + this.secondInnings.teamName);
                        
                    }
                    else {
                        this.firstInnings.teamName = teamName2;
                        this.secondInnings.teamName = teamName1;
                        console.log("First innings bating is " + this.firstInnings.teamName);
                        console.log("second innings bating is " + this.secondInnings.teamName);
                    }
                }
                else {
                    console.log("Team 2 won the toss");
                    let selection = prompt("Do you want bating / bowling: ").toLowerCase();
                    console.log("Match will start now");
                    if (selection === "bating") {
                        this.firstInnings.teamName = teamName2;
                        this.secondInnings.teamName = teamName1;
                        console.log("First innings bating is " + this.firstInnings.teamName);
                        console.log("second innings bating is " + this.secondInnings.teamName);
                    }
                    else {
                        this.firstInnings.teamName = teamName1;
                        this.secondInnings.teamName = teamName2;
                        console.log("First innings bating is " + this.firstInnings.teamName);
                        console.log("second innings bating is " + this.secondInnings.teamName);
                    }
                }
                    console.log("First Innings starting now");
                    this.matchStatus += 1;
                    this.firstInnings.startInnings();
                    console.log("second innings is starting now");
                    this.matchStatus += 1;
                    this.secondInnings.startInnings();
                    }
                    match.printResult();
                    match.exportStats();
                }
                else
                {
                    console.log("the players count must be in the range of 5 to 11");
                    return;
                }
            }
        }
    


class Innings {
    constructor(match) {
        this.teamName = "";
        this.teamPlayersCount = 0;
        this.overs = [];
        this.teamRuns = 0;
        this.teamWickets = 0;
        this.teamExtraRuns = 0;
        this.total = 6;
        this.match = match
        this.validOversBowled = 0;
    }

    startInnings() {
        let over = new Over(this.match);
        for (let i = 0; i < match.noOfOvers; i++) { //
            console.log("current over is " + Number(i + 1));
            for (let j = 0; j < this.total; j++) {
                if (over.validBallsBowled < 6) {
                    let ball = prompt("enter ball : ");
                    let result = over.handleInput(ball);
                    if (result === "current innings ended") {
                        console.log("current innings completed.");
                        match.matchStatus += 1;
                        return;
                    }
                }
                else {
                    console.log("over already completed");
                    break;
                }
            }
            this.overs.push(over);
        }
        match.matchStatus += 1;
    }

    getOverallRunRate() {
        let totalRuns = 0;
        let totalBalls = 0;
        for (const over of this.overs) {
            totalRuns += over.overRunsCount;
            totalBalls += over.overBallsBowled;
        }
        return totalRuns / totalBalls;
    }

    getRuns() {
        let totalRuns = 0;
        for (const over of this.overs) {
            totalRuns += over.overRunsCount;
        }

        return totalRuns;
    }
    getValidOversBowled() {
        return this.validOversBowled;
    }


    print() {
        console.log("Innings Summary");
        console.log(`Total Runs: ${this.getRuns()}`);
        console.log(`Overall Run Rate: ${this.getOverallRunRate()}`);
        console.log(`Valid Overs Bowled: ${this.getValidOversBowled()}`);
    }
}

class Over {
    constructor(match) {

        this.match = match
        this.validBalls = ["1", "2", "3", "4", "6"];
        this.nonValidBalls = ["wd", "n"];
        this.wick = ["w", "wicket"];
        this.wide = ["wd", "wide"];
        this.noBall = ["n", "noball"];
        this.undo = ["un", "undo"];
        this.exit = ["e", "exit"];
        this.convertInput = { "wide": "wd", "wd": "wd", "noball": "n", "n": "n" };
        this.ballsDetails = [];
        this.validBallsBowled = 0;
        this.overBallsBowled = 0;
    }

    divideNumStr(ball) {
        let index = ball.toLowerCase().indexOf(Constants.WIDE) || ball.toLowerCase().indexOf(Constants.NOBALL);
        let stringPart = ball.slice(index - 1,);
        return stringPart;
    }

    handleInput(ball) {
        if (this.validBallsBowled >= 6) {
            console.log("Over already completed. Cannot accept more balls.");
            return;
        } else if (ball === Constants.RUN) {
            console.log("Runs: " + this.getRuns());
        } else if (ball === Constants.RUNRATE) {
            console.log("Overall Run Rate: " + this.getOverallRunRate().toFixed(2));
        } else if (ball === Constants.RUNRATEVALIDBALL) {
            console.log("Run Rate for Valid Balls: " + this.getRunRateForValidBalls().toFixed(2));
        } else if (ball === Constants.RUNOVER) {
            console.log("Over Details: " + JSON.stringify(this.getOver()));
        } else if (Constants.EXIT.includes(ball.toLowerCase())) {
            console.log("Over completed. Exiting");
            return;
        } else if (Constants.UNDO.includes(ball.toLowerCase())) {
            this.undoLastBall();
            return;
        } else {
            let key = this.convertInput[ball.toLowerCase()] || ball.toLowerCase();
            this.overRunsCount += this.getRunsFromBall(key);
        }
    }

    getRunsFromBall(ball) {
        let runsScored = 0;
        let extras = 0;
        let ballType = "";
        let wicket = 1;
        if (this.validBalls.includes(ball)) {
            this.validBallsBowled += 1;
            runsScored += parseInt(ball);
            ballType = Constants.VALID;
        } else if (this.wick.includes(ball)) {
            if (match.matchStatus === 1) {
                match.firstInnings.teamWickets += 1;
            }
            else {
                match.secondInnings.teamWickets += 1;
            }
            if (match.firstInnings.teamWickets === match.team1PlayersCount - 1 || match.secondInnings.teamWickets === match.team1PlayersCount - 1) {
                return "current innings ended";
            }
            else {
                this.validBallsBowled += 1;
                ballType = Constants.WICKET;
            }
        } else {
            if (this.nonValidBalls.includes(ball)) {
                extras += Number(match.getExtraRuns(ball));
                if (match.matchStatus === 1) {
                    match.firstInnings.total += 1;
                }
                else {
                    match.secondInnings.total += 1;
                }

            } else {
                runsScored += Number(ball[0]);
                ball = ball.slice(1,);
                ball = this.convertInput[ball.toLowerCase()];
                const stringBall = this.divideNumStr(ball);
                if (this.nonValidBalls.includes(stringBall)) {
                    extras += Number(match.getExtraRuns(ball));
                }
                if (match.matchStatus === 1) {
                    match.firstInnings.total += 1;
                }
                else {
                    match.secondInnings.total += 1;
                }
            }
            this.overExtraRuns += extras;
            if (!(this.nonValidBalls.includes(ball))) {
                ball = ball.slice(1);
            }
            if (this.wide.includes(ball)) {
                ballType = Constants.WIDE;
            } else if (this.noBall.includes(ball)) {
                ballType = Constants.NOBALL;
            }
        }
        if (this.validBallsBowled === 6) {
            this.validOversBowled += 1;
            this.validBallsBowled = 0;
        }
        if (match.matchStatus === 1) {
            match.firstInnings.teamRuns += runsScored;
            match.firstInnings.teamExtraRuns += extras;
        }
        else {
            match.secondInnings.teamRuns += runsScored;
            match.secondInnings.teamExtraRuns += extras;
        }
        let myBall = new Ball();
        myBall.ballType = ballType;
        myBall.runs = runsScored;
        myBall.extraRuns = extras;
        this.ballsDetails.push(myBall);
        return runsScored;
    }

    undoLastBall() {
        if (this.ballsDetails.length > 0) {
            const lastBall = this.ballsDetails.pop();
            if (!(Constants.UNDO.includes(lastBall.ballType.toLowerCase()))) {
                this.validBallsBowled--;
                this.overBallsBowled--;
                if (!isNaN(parseInt(lastBall.runs))) {
                    this.overRunsCount -= parseInt(lastBall.runs);
                } else {
                    this.overRunsCount -= parseInt(lastBall.runs);
                    this.overExtraRuns -= parseInt(lastBall.extraRuns);
                }
            }
        }
    }

    getBallDetails(index) {
        console.log(this.ballsDetails[index - 1]);
    }

    getRunRateForValidBalls = () => {
        return this.overRunsCount / this.validBallsBowled;
    }

    getOverallRunRate = () => {
        return this.overRunsCount / this.overBallsBowled;
    }

    getRuns = () => {
        return this.overRunsCount;
    }

    getOver = () => {
        return this.ballsDetails;
    }

    displayOver = () => {
        return this.ballsDetails;
    }

    print() {
        console.log(this.ballsDetails);
    }
}


const prompt = require('prompt-sync')();
let match = new Match();
match.getInput();



