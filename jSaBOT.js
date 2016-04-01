#!/usr/bin/env node
/*
 * Bot.js : A Twitter bot that can retweet in response to the tweets matching multiple keywords.
 * Created by Travis Bennett (http://tdbennett.com @TravisDBennett.  Follow jSabot on twitter @javascriptSabot
 * Credit:
 		@StephenGFriend for getting me beck into #dev, all the time he spends answering my questions about code, and for helping me to debug nearly everything I write.
 		@DebashisBarman for his tutorial on building a twitterbot and his original design for which this bot was modeled.
 * License : http://creativecommons.org/licenses/by-sa/3.0
 */
var Twit = require('twit');
var fs = require('fs');
var dataLogJSON = require('./dataLog.json');

/* Read and parse dataLog.json */
var packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'));

/* Configure the Twitter API */
var TWITTER_CONSUMER_KEY = packageJSON.consumer_key;
var TWITTER_CONSUMER_SECRET = packageJSON.consumer_secret;
var TWITTER_ACCESS_TOKEN = packageJSON.access_token;
var TWITTER_ACCESS_TOKEN_SECRET = packageJSON.access_token_secret;

var Bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN,
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

/* twitter phrase array counter */
var counter = 0;

/* Get Twitter search phrases */
var twitterPhrase = packageJSON.keywords;

/* Count total retweets*/
var retweetCounter = 0;
var retweetTimer = 0;

/* Save retweet log*/
function saveLog(file, data){
	fs.writeFile('dataLog.json', JSON.stringify(data), (err) => {
		if (err) throw err;
	});
	console.log("\n"+"Log Saved")
}

/* Initialize the bot */
function jSaBotInit() {
  console.log('jSaBOT v ' + packageJSON.version + ' by |Travis Bennett| initialized...\nLongest Session:\n  Ran for:   ' + dataLogJSON.time + ' minutes\n  Processed: ' + dataLogJSON.tweets + '  tweets\n' + '\nNow retweeting the following keywords: \n' + twitterPhrase +'\n');
	Retweet();
	setInterval(Retweet, packageJSON.minutes*60*1000);
}
/* retweet count status every 30 minutes. */
	setInterval(retweetCount, 30*60*1000);

/* Count the number of retweets */
function retweetCount() {
	var dataLog = dataLogJSON

	retweetTimer = retweetTimer + 30;
	console.log("\njSaBOT has been running for " + retweetTimer + " mins\n" + "jSaBOT has processed: " + retweetCounter + " retweets\n");

	function tweetRecord() {
		if (dataLog.tweets < retweetCounter) {
			dataLog.tweets = retweetCounter;
		};
	}
	function timeRecord() {
		if (dataLog.time < retweetTimer) {
			dataLog.time = retweetTimer;
		};
	}
	timeRecord();
	tweetRecord();
	saveLog('dataLog.json', dataLog);
}

/* BotRetweet() : To retweet the matching recent tweet */
function Retweet() {

	var TWITTER_SEARCH_PHRASE = twitterPhrase[counter % twitterPhrase.length];

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('jSaBOT could not find latest tweet: ' + error);
			counter++;
			Retweet();
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			Bot.post('statuses/retweet/:id', id, BotRetweeted);

			function BotRetweeted(error, response) {
				if (error) {
					console.log(error + ' | ' + TWITTER_SEARCH_PHRASE);
					counter++;
					Retweet();
				}
				else {
					console.log('jSaBOT retweeted: ' + id.id + ' | ' + TWITTER_SEARCH_PHRASE);
					counter++;
					retweetCounter++;
				}
			}
		}
	}
}


/* Initiate the Bot */
jSaBotInit();
