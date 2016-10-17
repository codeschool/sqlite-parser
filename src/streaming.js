import { Transform } from 'stream';
import parser from './index';

const NEXT_QUERY = /[^\;]+(\;)?/g;

export class SqliteParserTransform extends Transform {
  constructor(options) {
    super(options);
    this.carryover = '';
    this.lastError = null;
  }

  _transform(data, encoding, callback) {
    let nextQuery = this.carryover;
    let currentData = data.toString();
    while (currentData !== '') {
      const nextMatch = currentData.indexOf(';');
      if (nextMatch !== -1) {
        nextQuery += currentData.slice(0, nextMatch + 1);
        currentData = currentData.slice(nextMatch + 1);
      } else if (currentData.length > 0) {
        nextQuery += currentData;
        currentData = '';
      }
      let nextAst;
      try {
        nextAst = parser(nextQuery, {
          streaming: true
        });
      } catch (e) {
        // Continue to the next semicolon
        this.lastError = e;
      }
      if (nextAst != null) {
        let serialized;
        try {
          serialized = JSON.stringify(nextAst, null, 2);
        } catch (e) {
          // Serialize error
          return callback(e);
        }
        this.push(serialized);
        nextQuery = '';
      }
    }
    this.carryover = nextQuery;
    callback();
  }

  _flush(callback) {
    // If there is still a little bit of query left in the buffer then
    // return the last error we saw.
    if (this.carryover.trim() !== '') {
      callback(this.lastError);
    }
    callback();
  }
}

export class SingleNodeTransform extends Transform {
  constructor(options) {
    super(options);
    this.push(`{\n  "type": "statement",\n  "variant": "list",\n  "statement": [\n    `);
    this.queries = 0;
  }

  _transform(data, encoding, callback) {
    data = data.toString();
    if (this.queries !== 0) {
      data = `,\n${data}`;
    }
    this.queries += 1;
    this.push(data.replace(/\n/g, '\n    '));
    callback();
  }

  _flush(callback) {
    this.push(`\n  ]\n}\n`);
    callback();
  }
}
