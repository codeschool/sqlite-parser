import parser from '../lib/index';
import {
  stat,
  writeFile,
  mkdir,
  readFile,
  createReadStream,
  createWriteStream
} from 'fs';
import {
  normalize,
  dirname
} from 'path';

const aliases = {
  o: 'output',
  v: 'version',
  h: 'help',
  x: 'stream'
};
const args = resolveArgs(process.argv.slice(2));

const error = function (err) {
  console.error(err);
  process.exit(1);
}
const done = checkThen(function () {
  process.exit(0);
});

if (args['version']) {
  console.log(`sqlite-parser v@@VERSION`);
  process.exit(0);
}

if (args['help'] || args._.length === 0) {
  console.log(`Usage:\tsqlite-parser [infile]\n`);
  console.log(`Option\t\t\tAlias\tDescription`);
  console.log(`--output [outfile]\t-o\tWrite output to a file instead of stdout`);
  console.log(`--stream\t\t-x\tEnable streaming mode (default: infile >150kB)`);
  console.log(`--version\t\t-v\tGet current parser version`);
  process.exit(0);
}

let streaming = args['stream'];
const input = normalize(args._[0]);
let output = args['output'];
if (output) {
  output = normalize(output);
}

stat(input, checkThen(function ({ size }) {
  // If the file size is above a 150kB limit, switch to streaming mode
  if (size / 1000 >= 150) {
    streaming = true;
  }
  const startStream = streaming ? streamParser : standardParser;
  if (output) {
    const outDir = dirname(output);
    stat(outDir, checkThen(startStream, function () {
      mkdir(outDir, startStream);
    }));
  } else {
    startStream();
  }
}));

function resolveArgs(argv) {
  const args = { _: [] };
  let last = null;
  const isNewArg = (arg) => !arg || arg.indexOf('-') === 0;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (isNewArg(arg)) {
      const cur = arg.indexOf('--') !== -1 ? arg.slice(2) : aliases[arg.slice(1)];
      const peek = argv.length - 1 !== i ? argv[i + 1] : null;
      const peekNew = isNewArg(peek);
      args[cur] = peekNew ? true : peek;
      if (!peekNew) { i += 1; }
    } else {
      args._.push(arg);
    }
  }
  return args;
}

function checkThen(
  resCallback = done,
  errCallback = error
) {
  return function (err, result) {
    if (err) { return errCallback(err); }
    resCallback(result);
  };
}

function streamParser() {
  const parserTransform = parser.createParser();
  const singleNodeTransform = parser.createStitcher();
  const readStream = createReadStream(input);
  const writeStream = output ? createWriteStream(output) : process.stdout;

  readStream.pipe(parserTransform);
  parserTransform.pipe(singleNodeTransform);
  singleNodeTransform.pipe(writeStream);

  parserTransform.on('error', error);
  singleNodeTransform.on('error', error);

  writeStream.on('finish', done);
}

function standardParser() {
  readFile(input, 'utf8', checkThen(function (data) {
    parser(data, checkThen(function (ast) {
      let result;
      try {
        result = JSON.stringify(ast, null, 2);
      } catch (e) {
        return error(e);
      }
      if (output) {
        writeFile(output, result, checkThen(done));
      } else {
        process.stdout.write(`${result}\n`);
        done();
      }
    }));
  }));
};
