-- original: malloc4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE tbl(
    the_first_reasonably_long_column_name that_also_has_quite_a_lengthy_type
  );
  INSERT INTO tbl VALUES(
    'An extra long string. Far too long to be stored in NBFS bytes.'
  );