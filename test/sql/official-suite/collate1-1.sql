-- original: collate1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE collate1t1(c1, c2);
    INSERT INTO collate1t1 VALUES(45, hex(45));
    INSERT INTO collate1t1 VALUES(NULL, NULL);
    INSERT INTO collate1t1 VALUES(281, hex(281))
;SELECT c2 FROM collate1t1 ORDER BY 1
;SELECT c2 FROM collate1t1 ORDER BY 1 COLLATE hex
;SELECT c2 FROM collate1t1 ORDER BY 1 COLLATE hex DESC
;SELECT c2 FROM collate1t1 ORDER BY 1 COLLATE hex ASC
;SELECT c2 COLLATE hex FROM collate1t1 ORDER BY 1
;SELECT c2 COLLATE hex FROM collate1t1 ORDER BY 1 ASC
;SELECT c2 COLLATE hex FROM collate1t1 ORDER BY 1 DESC
;DROP TABLE collate1t1
;CREATE TABLE collate1t1(c1, c2);
    INSERT INTO collate1t1 VALUES('5', '0x11');
    INSERT INTO collate1t1 VALUES('5', '0xA');
    INSERT INTO collate1t1 VALUES(NULL, NULL);
    INSERT INTO collate1t1 VALUES('7', '0xA');
    INSERT INTO collate1t1 VALUES('11', '0x11');
    INSERT INTO collate1t1 VALUES('11', '0x101')
;SELECT c1, c2 FROM collate1t1 ORDER BY 1 COLLATE numeric, 2 COLLATE hex
;SELECT c1, c2 FROM collate1t1 ORDER BY 1 COLLATE binary, 2 COLLATE hex
;SELECT c1, c2 FROM collate1t1 ORDER BY 1 COLLATE binary DESC, 2 COLLATE hex
;SELECT c1, c2 FROM collate1t1 
        ORDER BY 1 COLLATE binary DESC, 2 COLLATE hex DESC
;SELECT c1, c2 FROM collate1t1 
        ORDER BY 1 COLLATE binary ASC, 2 COLLATE hex ASC
;SELECT c1 COLLATE numeric, c2 FROM collate1t1 
     ORDER BY 1, 2 COLLATE hex
;SELECT c1 COLLATE hex, c2 FROM collate1t1 
     ORDER BY 1 COLLATE numeric, 2 COLLATE hex
;SELECT c1, c2 COLLATE hex FROM collate1t1 
     ORDER BY 1 COLLATE numeric, 2
;SELECT c1 COLLATE numeric, c2 COLLATE hex
      FROM collate1t1 
     ORDER BY 1, 2
;SELECT c1 COLLATE binary, c2 COLLATE hex
      FROM collate1t1
     ORDER BY 1, 2
;SELECT c1, c2
      FROM collate1t1 ORDER BY 1 COLLATE binary DESC, 2 COLLATE hex
;SELECT c1 COLLATE binary, c2 COLLATE hex
      FROM collate1t1 
     ORDER BY 1 DESC, 2 DESC
;SELECT c1 COLLATE hex, c2 COLLATE binary
      FROM collate1t1 
     ORDER BY 1 COLLATE binary ASC, 2 COLLATE hex ASC
;DROP TABLE collate1t1
;CREATE TABLE collate1t1(a COLLATE hex, b);
    INSERT INTO collate1t1 VALUES( '0x5', 5 );
    INSERT INTO collate1t1 VALUES( '1', 1 );
    INSERT INTO collate1t1 VALUES( '0x45', 69 );
    INSERT INTO collate1t1 VALUES( NULL, NULL );
    SELECT * FROM collate1t1 ORDER BY a
;SELECT * FROM collate1t1 ORDER BY 1
;SELECT * FROM collate1t1 ORDER BY collate1t1.a
;SELECT * FROM collate1t1 ORDER BY main.collate1t1.a
;SELECT a as c1, b as c2 FROM collate1t1 ORDER BY c1
;SELECT a as c1, b as c2 FROM collate1t1 ORDER BY c1 COLLATE binary
;SELECT a COLLATE binary as c1, b as c2
      FROM collate1t1 ORDER BY c1
;DROP TABLE collate1t1
;CREATE TABLE collate1t1(c1 numeric, c2 text);
    INSERT INTO collate1t1 VALUES(1, 1);
    INSERT INTO collate1t1 VALUES(12, 12);
    INSERT INTO collate1t1 VALUES(NULL, NULL);
    INSERT INTO collate1t1 VALUES(101, 101)
;SELECT c1 FROM collate1t1 ORDER BY 1
;SELECT c2 FROM collate1t1 ORDER BY 1
;SELECT c2+0 FROM collate1t1 ORDER BY 1
;SELECT c1||'' FROM collate1t1 ORDER BY 1
;SELECT (c1||'') COLLATE numeric FROM collate1t1 ORDER BY 1
;DROP TABLE collate1t1
;CREATE TABLE c5(
      id INTEGER PRIMARY KEY,
      a TEXT COLLATE binary COLLATE nocase COLLATE rtrim,
      b TEXT COLLATE nocase COLLATE binary,
      c TEXT COLLATE rtrim COLLATE binary COLLATE rtrim COLLATE nocase
    );
    INSERT INTO c5 VALUES(1, 'abc','abc','abc');
    INSERT INTO c5 VALUES(2, 'abc   ','ABC','ABC');
    SELECT id FROM c5 WHERE a='abc' ORDER BY id
;SELECT id FROM c5 WHERE b='abc' ORDER BY id
;SELECT id FROM c5 WHERE c='abc' ORDER BY id
;SELECT """"""""
;PRAGMA foreign_keys = ON;
  CREATE TABLE p1(a PRIMARY KEY COLLATE '"""');
  CREATE TABLE c1(x, y REFERENCES p1)
;INSERT INTO p1 VALUES('abc'); 
  INSERT INTO c1 VALUES(1, 'ABC')
;INSERT INTO p1 VALUES('abb');
  INSERT INTO p1 VALUES('wxz');
  INSERT INTO p1 VALUES('wxy');

  INSERT INTO c1 VALUES(2, 'abb');
  INSERT INTO c1 VALUES(3, 'wxz');
  INSERT INTO c1 VALUES(4, 'WXY');
  SELECT x, y FROM c1 ORDER BY y COLLATE """"""""
;SELECT 'abc' UNION ALL SELECT 'DEF'
    ORDER BY 1 COLLATE nocase COLLATE nocase COLLATE nocase COLLATE nocase
;SELECT 'abc' UNION ALL SELECT 'DEF'
    ORDER BY 1 COLLATE nocase COLLATE nocase COLLATE nocase COLLATE binary
;SELECT 'abc' UNION ALL SELECT 'DEF'
    ORDER BY 1 COLLATE binary COLLATE binary COLLATE binary COLLATE nocase;