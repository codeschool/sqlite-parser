/**
 * sqlite-parser
 */
import parser from './lib/parser';
import {isFunc} from './lib/parser-util';
import Tracer from './lib/tracer';

export default function sqliteParser(source, callback) {
  const t = Tracer();
  const isAsync = isFunc(callback);
  const opts = { 'tracer': t };
  // Async
  if (isAsync) {
    setTimeout(function () {
      try {
        callback(null, parser(source, opts));
      } catch (e) {
        callback(t.smartError(e));
      }
    }, 0);
    return;
  }
  // Sync
  try {
    return parser(source, opts);
  } catch (e) {
    throw t.smartError(e);
  }
};


sqliteParser['NAME'] = 'sqlite-parser';
sqliteParser['VERSION'] = '@@VERSION';
