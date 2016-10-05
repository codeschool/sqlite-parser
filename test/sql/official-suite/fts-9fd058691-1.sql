-- original: fts-9fd058691.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE fts USING fts3( tags TEXT);
  INSERT INTO fts (tags) VALUES ('tag1');
  SELECT * FROM fts WHERE tags MATCH 'tag1'
;UPDATE fts SET tags = 'tag1' WHERE rowid = 1;
    SELECT * FROM fts WHERE tags MATCH 'tag1'
;CREATE VIRTUAL TABLE fts USING fts3(tags TEXT);
  INSERT INTO fts (docid, tags) VALUES (1, 'tag1');
  INSERT INTO fts (docid, tags) VALUES (2, NULL);
  INSERT INTO fts (docid, tags) VALUES (3, 'three')
;UPDATE fts SET tags = 'two' WHERE rowid = 2;
    SELECT * FROM fts WHERE tags MATCH 'two';