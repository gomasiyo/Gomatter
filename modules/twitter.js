var twitter = require('twitter');

var client = new twitter({
    consumer_key: consumerConf.consumerKey,
    consumer_secret: consumerConf.consumerSecret,
    access_token_key: OAuthToken.userToken,
    access_token_secret: OAuthToken.userSecret
});

client.stream('user',function(stream) {

    stream.on('data', function(tweet) {


        if(typeof tweet.text != 'undefined' ) {

            View.boarder();

            View.br();

            console.log("Name: " + tweet.user.name, "  ScreenName: " + tweet.user.screen_name);
            console.log(tweet.text);

            View.br();

        }

    });

    stream.on('error', function(error) {
        throw error;
    });

});
