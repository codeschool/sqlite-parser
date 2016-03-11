/**
 * sqlite-parser
 */
import parser from './lib/parser';
import {isFunc} from './lib/parser-util';
import Tracer from './lib/tracer';

export default function sqliteParser(source, callback) {
  let res, err;
  const t = Tracer();
  const isAsync = isFunc(callback);
  try {
    res = parser(source, { 'tracer': t });
  } catch (e) {
    err = t.smartError(e);
  }
  if (isAsync) {
    callback(err, res);
  } else {
    if (err) { throw err; }
    return res;
  }
};


sqliteParser['NAME'] = 'sqlite-parser';
sqliteParser['VERSION'] = '@@VERSION';
