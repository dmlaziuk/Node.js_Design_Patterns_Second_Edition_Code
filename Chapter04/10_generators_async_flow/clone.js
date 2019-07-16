const fs = require('fs');
const path = require('path');

function asyncFlow(generatorFunction) {
  const generator = generatorFunction((err, ...args) => err ? generator.throw(err) : generator.next(args.length > 1 ? args : args[0]));
  generator.next();
}

function* asyncFunc(callback) {
  const fileName = path.basename(__filename);
  const fileContent = yield fs.readFile(fileName, 'utf8', callback);
  yield fs.writeFile(`clone_of_${fileName}`, fileContent, callback);
  console.log('Clone created');
}

asyncFlow(asyncFunc);
