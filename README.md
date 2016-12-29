Create a Twitter bot using Node.js and the Twitter API v1.1. The bot will automatically retweet in response to tweets with some particular hashtags. (https://goo.gl/4whEIt)

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


6) In terminal, switch to the directory jSaBOT is installed and run jSabot.js:
  node jsabot.js


Licensed under http://creativecommons.org/licenses/by-sa/3.0
Report error and bugs to travis.david.bennett@gmail.com - http://tdbennett.com

JSaBOT v1.1.3 - Changelog
Fixed bug encountered when "data.statuses[0].id_str" = undefined
