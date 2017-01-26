Create a Twitter bot using Node.js and the Twitter API v1.1. The bot will automatically retweet in response to tweets with some particular hashtags Will also tweet users with custom message on follow. (https://goo.gl/4whEIt)

Installation Instructions:

1) Install Node.js
    If you're using OS X or Windows, the best way to install Node.js is to use one of the installers from http://nodejs.org
    npm is preferred.


2) Create a twitter account, if you already have one, it may be used.

3) Create a Twitter application
    Go to apps.twitter.com, sign-in with your new Twitter account and create a Twitter application.

    Give your application a name, description and put any URL in the website field. Keep the callback URL field blank, agree to the terms and submit the form to create your first Twitter application.

    Once the Twitter application has been created, click the Keys and Access Tokens tab and click the
    Create my Access Token button. Twitter will generate the Consumer Keys and Access tokens that we will need in a later step.

4) Download the source code from github:
  https://github.com/soldierforus/jSaBOT.git

5) Edit the values below in the file "package.json"
  Add the values for:
   "keywords": ["#keywordToSearch","otherKeywords"]
   "minutes": number of minutes between retweets
   "consumer_key": "your key here"
   "consumer_secret": "your key here"
   "access_token": "your key here"
   "access_token_secret": "your key here"

 ### Keyword query operators:
 The query can have operators that modify its behavior. the available operators are:

 Operator	Finds Tweets...
 watching now	| containing both “watching” and “now”. This is the default operator.
 “happy hour”	| containing the exact phrase “happy hour”.
 love OR hate	| containing either “love” or “hate” (or both).
 beer -root	  |containing “beer” but not “root”.
 #haiku	      | containing the hashtag “haiku”.
 from:interior|	sent from Twitter account “interior”.
 list:NASA/astronauts-in-space-now	| sent from a Twitter account in the NASA list astronauts-in-space-now
 to:NASA      | a Tweet authored in reply to Twitter account “NASA”.
 @NASA	      | mentioning Twitter account “NASA”.
 politics filter:safe	containing “politics” | with Tweets marked as potentially sensitive removed.
 puppy filter:media	| containing “puppy” and an image or video.
 puppy filter:native_video |	containing “puppy” and an uploaded video, Amplify video, Periscope, or Vine.
 puppy filter:periscope	| containing “puppy” and a Periscope video URL.
 puppy filter:vine |	containing “puppy” and a Vine.
 puppy filter:images |	containing “puppy” and links identified as photos, including third parties such as Instagram.
 puppy filter:twimg	| containing “puppy” and a pic.twitter.com link representing one or more photos.
 hilarious filter:links |	containing “hilarious” and linking to URL.
 puppy url:amazon	| containing “puppy” and a URL with the word “amazon” anywhere within it.
 superhero since:2015-12-21	| containing “superhero” and sent since date “2015-12-21” (year-month-day).
 puppy until:2015-12-21	| containing “puppy” and sent before the date “2015-12-21”.
 movie -scary :) |	containing “movie”, but not “scary”, and with a positive attitude.
 flight :( |	containing “flight” and with a negative attitude.
 traffic ? |	containing “traffic” and asking a question.
 Please, make sure to URL encode these queries before making the request. There are several online tools to help you to do that, or you can search at twitter.com/search and copy the encoded URL from the browser’s address bar. The table below shows some example mappings from search queries to URL encoded queries:

 Search query	URL encoded query
 #haiku #poetry	%23haiku+%23poetry
 “happy hour” :)	%22happy%20hour%22%20%3A%29
 Note that the space character can be represented by “%20” or “+” sign.


6) In terminal, switch to the directory jSaBOT is installed and run jSabot.js:
  node jsabot.js


Licensed under http://creativecommons.org/licenses/by-sa/3.0
Report error and bugs to travis.david.bennett@gmail.com - http://tdbennett.com

JSaBOT v1.2.0 - Changelog
Now capable of responding with thank you message
