/**
 * sqlite-parser
 */
import parser from './lib/parser';
import {isFunc} from './lib/parser-util';

export default function sqliteParser(source, callback) {
  if (isFunc(callback)) {
    try {
      callback(null, parser(source));
    } catch (e) {
      callback(e);
    }
  } else {
    return parser(source);
  }
};

sqliteParser['NAME'] = 'sqlite-parser';
sqliteParser['VERSION'] = '@@VERSION';
