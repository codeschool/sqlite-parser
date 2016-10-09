-- original: fuzzerfault.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE x1_rules(ruleset, cFrom, cTo, cost);
    INSERT INTO x1_rules VALUES(0, 'a', 'b', 1);
    INSERT INTO x1_rules VALUES(0, 'a', 'c', 2);
    INSERT INTO x1_rules VALUES(0, 'a', 'd', 3)
;CREATE VIRTUAL TABLE x1 USING fuzzer(x1_rules);
    SELECT word FROM x1 WHERE word MATCH 'xax'
;CREATE TABLE x2_rules(ruleset, cFrom, cTo, cost);
    INSERT INTO x2_rules VALUES(0, 'a', 'x', 1);
    INSERT INTO x2_rules VALUES(0, 'b', 'x', 2);
    INSERT INTO x2_rules VALUES(0, 'c', 'x', 3);
    CREATE VIRTUAL TABLE x2 USING fuzzer(x2_rules)
;SELECT count(*) FROM x2 WHERE word MATCH 'abc'
;CREATE TABLE x1_rules(ruleset, cFrom, cTo, cost);
    INSERT INTO x1_rules VALUES(0, 'a', 
      '123456789012345678901234567890a1234567890123456789', 10
    )
;CREATE VIRTUAL TABLE x1 USING fuzzer(x1_rules);
    SELECT count(*) FROM (SELECT * FROM x1 WHERE word MATCH 'a' LIMIT 2);