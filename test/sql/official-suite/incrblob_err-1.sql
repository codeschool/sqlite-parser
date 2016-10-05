-- original: incrblob_err.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE blobs(k, v BLOB);
    INSERT INTO blobs VALUES(1, zeroblob(sub_bytes))
;CREATE TABLE blobs(k, v BLOB);
    INSERT INTO blobs VALUES(1, sub_data)
;CREATE TABLE blobs(k, v BLOB);
    INSERT INTO blobs VALUES(1, sub_data)
;CREATE TABLE blobs(k, v BLOB);
  INSERT INTO blobs VALUES(1, sub_data)
;CREATE TABLE blobs(k, v BLOB);
  INSERT INTO blobs VALUES(1, zeroblob(length(CAST(sub_data AS BLOB))))
;CREATE TABLE blobs(k, v BLOB);
  INSERT INTO blobs VALUES(1, sub_data || sub_data || sub_data)
;PRAGMA auto_vacuum = 1;
  CREATE TABLE blobs(k INTEGER PRIMARY KEY, v BLOB);
  INSERT INTO blobs VALUES(1, zeroblob(500 * 1020))
;PRAGMA auto_vacuum = 1;
  CREATE TABLE blobs(k INTEGER PRIMARY KEY, v BLOB);
  INSERT INTO blobs VALUES(1, zeroblob(500 * 1020));