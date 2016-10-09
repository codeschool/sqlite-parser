-- original: tkt2686.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size=1024;
  PRAGMA max_page_count=50;
  PRAGMA auto_vacuum=0;
  CREATE TABLE filler (fill)
;DELETE FROM filler 
       WHERE rowid <= (SELECT MAX(rowid) FROM filler LIMIT 20)
;PRAGMA page_size=1024;
  PRAGMA max_page_count=50;
  PRAGMA auto_vacuum=1;
  CREATE TABLE filler (fill)
;DELETE FROM filler 
       WHERE rowid <= (SELECT MAX(rowid) FROM filler LIMIT 20);