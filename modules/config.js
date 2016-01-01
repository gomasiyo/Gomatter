/**
 *  Config 読み書き用モジュール
 *
 *  @author Goma::NanoHa
 *  @version 1.0.0
 */

var fs = require('fs');

/**
 *  コンストラクタ Configディレクトリのパスを指定
 *  デフォルトでは [ ./config ]
 *
 *  @param {string} path
 */
var Config = function(path) {
    this.configPath = (typeof path != "string") ? './config/' : path;
}

/**
 *  コンフィグをロードするメソッド
 *
 *  @param {string} file
 *  @return {object} ロードされたJSONファイル
 */
Config.prototype.load = function(file) {
    try{
        return JSON.parse(fs.readFileSync(this.configPath + file, 'utf8'));
    } catch(e) {
        if(e.errno == -2) console.error('File Open Error');
        process.exit();
    }
}

module.exports = Config;
