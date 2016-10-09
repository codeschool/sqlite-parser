-- original: fts3atoken.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT fts3_tokenizer('blah', fts3_tokenizer('simple')) IS NULL
;SELECT fts3_tokenizer('blah') == fts3_tokenizer('simple')
;INSERT INTO t1(content) VALUES('There was movement at the station');
    INSERT INTO t1(content) VALUES('For the word has passed around');
    INSERT INTO t1(content) VALUES('That the colt from ol regret had got away');
    SELECT content FROM t1 WHERE content MATCH 'movement'
;SELECT fts3_tokenizer_test('simple', 'I don''t see how')
;SELECT fts3_tokenizer_test('porter', 'I don''t see how')
;SELECT fts3_tokenizer_test('icu', 'I don''t see how')
;SELECT fts3_tokenizer_test('icu', sub_locale, sub_input)
;CREATE VIRTUAL TABLE x1 USING fts3(name,TOKENIZE icu en_US);
    insert into x1 (name) values (NULL);
    insert into x1 (name) values (NULL);
    delete from x1
;INSERT INTO x1 VALUES(sub_str)
;SELECT fts3_tokenizer_internal_test();