/**
 * sqlite-parser
 */
import parser from './lib/parser';
import Tracer from './lib/tracer';

export default function sqliteParser(source, callback) {
  const t = Tracer();
  let res;
  try {
    callback(null, parser(source, {
      'tracer': t
    }));
  } catch (e) {
    callback(t.smartError(e));
  }
};



sqliteParser['NAME'] = 'sqlite-parser';
sqliteParser['VERSION'] = '@@VERSION';
