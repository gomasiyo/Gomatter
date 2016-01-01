/**
 *  ビューパーツ用モジュール
 *
 *  @author Goma::NanoHa
 *  @version 1.0.0
 */

var size = require('window-size');

var View = {

    boarder: function()
    {
        var width = size.width;
        var boarder = '';
        while(width--) boarder += '-';
        console.log(boarder);
    },

    systemLog: function(message)
    {
        console.log('[System]', message);
    },

    br: function()
    {
        console.log();
    }

}

module.exports = View;
