/**
 *  System Modules
 */
var async = require('async');
var notifier = require('node-notifier');
var twitter = require('twitter');
var OAuth = require('oauth').OAuth;
var readline = require("readline").createInterface(process.stdin, process.stdout);

/**
 *  User Modules
 */
var Config = require('./modules/config');
var View = require('./modules/view');

/**
 *  Config Load
 */
var Config = new Config();
var oauthConf = Config.load('oauth.json');
var consumerConf = Config.load('consumer.json');
var accessConf = Config.load('access.json');

if(!Object.keys(accessConf).length) {


    View.boarder();
    View.br();
    View.systemLog('ユーザーが作成されていません、ユーザーを作成します。');
    View.br();

    var oauth = new OAuth(
        oauthConf.requestTokenUrl,
        oauthConf.accessTokenUrl,
        consumerConf.consumerKey,
        consumerConf.consumerSecret,
        oauthConf.version,
        oauthConf.callbackUrl,
        oauthConf.signatureMethod
    );

    var OAuthToken = {};

    async.series([
        function(callback) {

            oauth.getOAuthRequestToken(function(err, token, secret){

                if(err) return process.exit();

                OAuthToken.token = token;
                OAuthToken.secret = secret;

                View.systemLog('以下のURLにアクセスしてPINコードを取得してください。');
                View.br();
                console.log(oauthConf.authenticateUrl + token);
                View.br();

                callback(null, null);

            });

        },
        function(callback) {


            View.systemLog('取得したPINコードを入力してください。');

            readline.question('PIN > ', function(pin){

                View.br();
                OAuthToken.pin = pin;

                readline.close();
                callback(null, null);

            });


        },
        function(callback) {

            oauth.getOAuthAccessToken(OAuthToken.token, OAuthToken.secret, OAuthToken.pin, function (err, token, secret) {

                if(err) return process.exit();

                console.log(arguments);

            });

        }
    ]);




}

