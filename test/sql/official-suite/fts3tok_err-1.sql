-- original: fts3tok_err.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts3tokenize("simple")
;CREATE VIRTUAL TABLE t1 USING fts3tokenize("simple")
;SELECT token FROM t1 WHERE input = 'A galaxy far, far away';