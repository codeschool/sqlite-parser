/**
 * sqlite-parser
 */
import { parse, SyntaxError as PegSyntaxError } from './lib/parser';
import { Tracer } from './lib/tracer';

export default function sqliteParser(source, callback) {
  const t = Tracer();
  const isAsync = typeof callback === 'function';
  const opts = { 'tracer': t };
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


sqliteParser['NAME'] = 'sqlite-parser';
sqliteParser['VERSION'] = '@@VERSION';
