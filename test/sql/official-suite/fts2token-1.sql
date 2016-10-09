-- original: fts2token.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT fts2_tokenizer('blah', fts2_tokenizer('simple')) IS NULL
;SELECT fts2_tokenizer('blah') == fts2_tokenizer('simple')
;INSERT INTO t1(content) VALUES('There was movement at the station');
    INSERT INTO t1(content) VALUES('For the word has passed around');
    INSERT INTO t1(content) VALUES('That the colt from ol regret had got away');
    SELECT content FROM t1 WHERE content MATCH 'movement'
;SELECT fts2_tokenizer_test('simple', 'I don''t see how')
;SELECT fts2_tokenizer_test('porter', 'I don''t see how')
;SELECT fts2_tokenizer_test('icu', 'I don''t see how')
;SELECT fts2_tokenizer_test('icu', sub_locale, sub_input)
;SELECT fts2_tokenizer_internal_test();