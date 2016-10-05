-- original: autoindex5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE source_package_status
          (bug_name TEXT NOT NULL,
           package INTEGER NOT NULL,
           vulnerable INTEGER NOT NULL,
           urgency TEXT NOT NULL,
           PRIMARY KEY (bug_name, package));
  CREATE INDEX source_package_status_package
              ON source_package_status(package);
  
  CREATE TABLE source_packages
              (name TEXT NOT NULL,
              release TEXT NOT NULL,
              subrelease TEXT NOT NULL,
              archive TEXT NOT NULL,
              version TEXT NOT NULL,
              version_id INTEGER NOT NULL DEFAULT 0,
              PRIMARY KEY (name, release, subrelease, archive));
  
  CREATE TABLE bugs
          (name TEXT NOT NULL PRIMARY KEY,
           cve_status TEXT NOT NULL
               CHECK (cve_status IN
                      ('', 'CANDIDATE', 'ASSIGNED', 'RESERVED', 'REJECTED')),
           not_for_us INTEGER NOT NULL CHECK (not_for_us IN (0, 1)),
           description TEXT NOT NULL,
           release_date TEXT NOT NULL,
           source_file TEXT NOT NULL,
           source_line INTEGER NOT NULL);
  
  CREATE TABLE package_notes
          (id INTEGER NOT NULL PRIMARY KEY,
           bug_name TEXT NOT NULL,
           package TEXT NOT NULL,
           fixed_version TEXT
               CHECK (fixed_version IS NULL OR fixed_version <> ''),
           fixed_version_id INTEGER NOT NULL DEFAULT 0,
           release TEXT NOT NULL,
           package_kind TEXT NOT NULL DEFAULT 'unknown',
           urgency TEXT NOT NULL,
           bug_origin TEXT NOT NULL DEFAULT '');
  CREATE INDEX package_notes_package
              ON package_notes(package);
  CREATE UNIQUE INDEX package_notes_bug
              ON package_notes(bug_name, package, release);
  
  CREATE TABLE debian_bugs
          (bug INTEGER NOT NULL,
           note INTEGER NOT NULL,
           PRIMARY KEY (bug, note));
  
  
  CREATE VIEW debian_cve AS
              SELECT DISTINCT debian_bugs.bug, st.bug_name
              FROM package_notes, debian_bugs, source_package_status AS st
              WHERE package_notes.bug_name = st.bug_name
              AND debian_bugs.note = package_notes.id
              ORDER BY debian_bugs.bug
;EXPLAIN QUERY PLAN
  SELECT
    st.bug_name,
    (SELECT ALL debian_cve.bug FROM debian_cve
      WHERE debian_cve.bug_name = st.bug_name
      ORDER BY debian_cve.bug),
    sp.release
  FROM
     source_package_status AS st,
     source_packages AS sp,
     bugs
  WHERE
     sp.rowid = st.package
     AND st.bug_name = bugs.name
     AND ( st.bug_name LIKE 'CVE-%' OR st.bug_name LIKE 'TEMP-%' )
     AND ( sp.release = 'sid' OR sp.release = 'stretch' OR sp.release = 'jessie'
            OR sp.release = 'wheezy' OR sp.release = 'squeeze' )
  ORDER BY sp.name, st.bug_name, sp.release, sp.subrelease
;CREATE TABLE one(o);
  INSERT INTO one DEFAULT VALUES;

  CREATE TABLE t1(x, z);
  INSERT INTO t1 VALUES('aaa', 4.0);
  INSERT INTO t1 VALUES('aaa', 4.0);
  CREATE VIEW vvv AS
    SELECT * FROM t1
    UNION ALL
    SELECT 0, 0 WHERE 0;

  SELECT (
      SELECT sum(z) FROM vvv WHERE x='aaa'
  ) FROM one;