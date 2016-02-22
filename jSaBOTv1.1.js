/*!
 * Bot.js : A Twitter bot that can retweet in response to the tweets matching multiple keywords.
 * Version 1.1
 	Changes from original design:
			-Fixed bugs
			-Added multiple keywords
			-Added functionality and aethsetics to console.log statements
	In next release:
			-Add tracking log for time ran, total retweets, and retweet by keyword
 * Created by Travis Bennett (http://tdbennett.com @TravisDBennett.  Follow jSabot on twitter @javascriptSabot
 * Thanks to:
 		@DebashisBarman for his original tutorial on building a twitterbot the original design for which his bot was modeled after and aims to improve.
		@StephenGFriend for getting me beck into #dev, all the time he spends answering my questions about code, and for helping me to debug nearly everything I write.
 * License : http://creativecommons.org/licenses/by-sa/3.0
 */

/* Configure the Twitter API */
var TWITTER_CONSUMER_KEY = '';
var TWITTER_CONSUMER_SECRET = '';
var TWITTER_ACCESS_TOKEN = '-6Skbhl3276YvDbN45NcYJeELRIZDMKVkrQNKx0a';
var TWITTER_ACCESS_TOKEN_SECRET = '';

var Twit = require('twit');

var Bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN,
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

/* twitter phrase array counter */
var counter = 0;

/* Set Twitter search phrases */
var twitterPhrase = ['TravisDBennett'];

/* Initialize the bot */
function jSaBotInit() {
  		console.log('jSaBOT v1.1 by |TRaViS BeNNeTT| initialized...\n\nNow retweeting the following keywords: \n' + twitterPhrase +'\n');

/* Set first integer to minutes in between retweets */
	Retweet();
	setInterval(Retweet, 10*60*1000);
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
				}
			}
		}
	}
}

/* Initiate the Bot */
jSaBotInit();
