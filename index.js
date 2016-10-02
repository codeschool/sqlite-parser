/**
 * sqlite-parser
 */
import parser from './lib/parser';
import Tracer from './lib/tracer';

export default function sqliteParser(source, callback) {
  const t = Tracer();
  const isAsync = typeof callback === 'function';
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
