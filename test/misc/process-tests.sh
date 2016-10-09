#!/usr/bin/env bash

node ../../node_modules/.bin/pegjs --output test-parser.js test-grammar.pegjs
node ./process-tests '../raw/*.test' ../sql/official-suite/
