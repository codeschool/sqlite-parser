/*!
 * sqlite-parser - v1.0.0-beta2
 * @copyright 2015-2016 Code School (http://codeschool.com)
 * @author Nick Wronski <nick@javascript.com>
 */
'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.default=sqliteParser;var _parser=require('./parser');var _tracer=require('./tracer');var _streaming=require('./streaming');function sqliteParser(source,options,callback){var t=(0,_tracer.Tracer)();if(arguments.length===2){if(typeof options==='function'){callback=options;options={};}}var isAsync=typeof callback==='function';var opts={'tracer':t,'startRule':'start'};if(options&&options.streaming){opts['startRule']='start_streaming';}if(isAsync){setTimeout(function(){var result=void 0;try{result=(0,_parser.parse)(source,opts);}catch(e){callback(e instanceof _parser.SyntaxError?t.smartError(e):e);}callback(null,result);},0);}else{try{return(0,_parser.parse)(source,opts);}catch(e){throw e instanceof _parser.SyntaxError?t.smartError(e):e;}}};sqliteParser['SqliteParserTransform']=_streaming.SqliteParserTransform;sqliteParser['NAME']='sqlite-parser';sqliteParser['VERSION']='1.0.0-beta2';module.exports=exports['default'];
