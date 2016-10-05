-- original: fts3snippet.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE ft USING fts3;
      INSERT INTO ft VALUES('xxx xxx xxx xxx')
;DROP TABLE IF EXISTS ft;
      CREATE VIRTUAL TABLE ft USING fts3(a, b);
      INSERT INTO ft VALUES(sub_v1, sub_numbers);
      INSERT INTO ft VALUES(sub_v1, NULL)
;UPDATE ft_content SET c1b = 'hello world' WHERE c1b = sub_numbers
;DROP TABLE IF EXISTS ft;
      CREATE VIRTUAL TABLE ft USING fts3;
      INSERT INTO ft VALUES('one two three four five six seven eight nine ten')
;INSERT INTO ft VALUES(
           'one two three four five '
        || 'six seven eight nine ten '
        || 'eleven twelve thirteen fourteen fifteen '
        || 'sixteen seventeen eighteen nineteen twenty '
        || 'one two three four five '
        || 'six seven eight nine ten '
        || 'eleven twelve thirteen fourteen fifteen '
        || 'sixteen seventeen eighteen nineteen twenty'
      )
;DROP TABLE IF EXISTS ft;
      CREATE VIRTUAL TABLE ft USING fts3(a, b, c);
      INSERT INTO ft VALUES(
        'one two three four five', 
        'four five six seven eight', 
        'seven eight nine ten eleven'
      )
;UPDATE ft SET b = NULL
;DROP TABLE IF EXISTS ft;
      CREATE VIRTUAL TABLE ft USING fts3(x);
      INSERT INTO ft VALUES(sub_numbers)
;BEGIN;
        DROP TABLE IF EXISTS ft;
        CREATE VIRTUAL TABLE ft USING fts3(x)
;INSERT INTO ft VALUES('one' || sub_commas || 'two')
;DROP TABLE IF EXISTS ft;
      CREATE VIRTUAL TABLE ft USING fts3;
      INSERT INTO ft VALUES(sub_ten);
      INSERT INTO ft VALUES(sub_ten || ' ' || sub_ten)
;DROP TABLE IF EXISTS ft;
      CREATE VIRTUAL TABLE ft USING fts3(x, y)
;INSERT INTO ft(docid, x, y) VALUES(sub_docid, sub_v1, sub_v2)
;CREATE VIRTUAL TABLE t2 USING fts4;
  INSERT INTO t2 VALUES('one two three four five');
  INSERT INTO t2 VALUES('two three four five one');
  INSERT INTO t2 VALUES('three four five one two');
  INSERT INTO t2 VALUES('four five one two three');
  INSERT INTO t2 VALUES('five one two three four')
;SELECT snippet(t2, '[', ']') FROM t2 WHERE t2 MATCH 'one OR (four AND six)'
;SELECT snippet(t2, '[', ']') FROM t2 
  WHERE t2 MATCH 'one OR (four AND six)' 
  ORDER BY docid DESC
;INSERT INTO t2 VALUES('six')
;SELECT snippet(t2, '[', ']') FROM t2 WHERE t2 MATCH 'one OR (four AND six)'
;SELECT snippet(t2, '[', ']') FROM t2 
  WHERE t2 MATCH 'one OR (four AND six)' 
  ORDER BY docid DESC
;CREATE VIRTUAL TABLE t3 USING fts4;
  INSERT INTO t3 VALUES('[one two three]')
;SELECT snippet(t3) FROM t3 WHERE t3 MATCH 'one'
;SELECT snippet(t3) FROM t3 WHERE t3 MATCH 'two'
;SELECT snippet(t3) FROM t3 WHERE t3 MATCH 'three'
;SELECT snippet(t3) FROM t3 WHERE t3 MATCH 'one OR two OR three'
;CREATE VIRTUAL TABLE t4 USING fts4;
  INSERT INTO t4 VALUES('a b c d');
  SELECT snippet(t4, '[', ']', '...', 0, 0) FROM t4 WHERE t4 MATCH 'b'
;INSERT INTO t4 VALUES('sub_x35 E sub_x35 F sub_x35 G sub_x35');