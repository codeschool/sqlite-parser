-- original: tkt2332.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE blobs (k INTEGER PRIMARY KEY, v BLOB);
    PRAGMA cache_size = 100
;INSERT INTO blobs VALUES(sub_iKey, zeroblob(sub_Len))
;SELECT length(v) FROM blobs WHERE k = sub_iKey
;SELECT length(v) FROM blobs WHERE k = sub_iKey
;SELECT v FROM blobs WHERE k = sub_iKey;