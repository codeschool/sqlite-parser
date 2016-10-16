/**
 * sqlite-parser
 */
import { parse, SyntaxError as PegSyntaxError } from './parser';
import { Tracer } from './tracer';
import { SqliteParserTransform, SingleNodeTransform } from './streaming';

export default function sqliteParser(source, options, callback) {
  const t = Tracer();

  if (arguments.length === 2) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
  }
  const isAsync = typeof callback === 'function';
  const opts = { 'tracer': t, 'startRule': 'start' };
  if (options && options.streaming) {
    opts['startRule'] = 'start_streaming';
  }
  if (isAsync) {
    // Async
    setTimeout(function () {
      let result;
      try {
        result = parse(source, opts);
      } catch (e) {
        callback(e instanceof PegSyntaxError ? t.smartError(e) : e);
      }
      callback(null, result);
    }, 0);
  } else {
    // Sync
    try {
      return parse(source, opts);
    } catch (e) {
      throw e instanceof PegSyntaxError ? t.smartError(e) : e;
    }
  }
};

sqliteParser['createParser'] = function () {
  return new SqliteParserTransform();
};

sqliteParser['createStitcher'] = function () {
  return new SingleNodeTransform();
};

sqliteParser['NAME'] = 'sqlite-parser';
sqliteParser['VERSION'] = '@@VERSION';
