-- original: fts3aj.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t3 USING fts3(content);
  INSERT INTO t3 (rowid, content) VALUES(1, "hello world")
;CREATE VIRTUAL TABLE t1 USING fts3(content);
  INSERT INTO t1 (rowid, content) VALUES(1, "hello world");
  INSERT INTO t1 (rowid, content) VALUES(2, "hello there");
  INSERT INTO t1 (rowid, content) VALUES(3, "cruel world")
;ATTACH DATABASE 'test2.db' AS two;
    SELECT rowid FROM t1 WHERE t1 MATCH 'hello';
    DETACH DATABASE two
;DETACH DATABASE two
;ATTACH DATABASE 'test2.db' AS two;
    CREATE VIRTUAL TABLE two.t2 USING fts3(content);
    INSERT INTO t2 (rowid, content) VALUES(1, "hello world");
    INSERT INTO t2 (rowid, content) VALUES(2, "hello there");
    INSERT INTO t2 (rowid, content) VALUES(3, "cruel world");
    SELECT rowid FROM t2 WHERE t2 MATCH 'hello';
    DETACH DATABASE two
;DETACH DATABASE two
;ATTACH DATABASE 'test2.db' AS two;

    CREATE VIRTUAL TABLE two.t3 USING fts3(content);
    INSERT INTO two.t3 (rowid, content) VALUES(2, "hello there");
    INSERT INTO two.t3 (rowid, content) VALUES(3, "cruel world");
    SELECT rowid FROM two.t3 WHERE t3 MATCH 'hello';

    DETACH DATABASE two
;DETACH DATABASE two;