-- original: tkt2767.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

-- Construct a table with many rows of data
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(2);
    INSERT INTO t1 SELECT x+2 FROM t1;
    INSERT INTO t1 SELECT x+4 FROM t1;
    INSERT INTO t1 SELECT x+8 FROM t1;
    INSERT INTO t1 SELECT x+16 FROM t1;

    -- BEFORE triggers that invoke raise(ignore).  The effect of
    -- these triggers should be to make INSERTs, UPDATEs, and DELETEs
    -- into no-ops.
    CREATE TRIGGER r1 BEFORE UPDATE ON t1 BEGIN
      SELECT raise(ignore);
    END;
    CREATE TRIGGER r2 BEFORE DELETE ON t1 BEGIN
      SELECT raise(ignore);
    END;
    CREATE TRIGGER r3 BEFORE INSERT ON t1 BEGIN
      SELECT raise(ignore);
    END;

    -- Verify the table content
    SELECT count(*), sum(x) FROM t1
;DELETE FROM t1 WHERE x>0;
    SELECT count(*), sum(x) FROM t1
;UPDATE t1 SET x=x+1;
    SELECT count(*), sum(x) FROM t1
;INSERT INTO t1 SELECT x+32 FROM t1;
    SELECT count(*), sum(x) FROM t1;