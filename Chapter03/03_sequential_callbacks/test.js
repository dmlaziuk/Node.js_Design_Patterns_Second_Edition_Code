function asyncOperation(callback) {
  process.nextTick(callback);
}

function task1(callback) {
  asyncOperation(() => task2(callback));
  console.log('tasks 1');
}

function task2(callback) {
  asyncOperation(() => task3(callback));
  console.log('tasks 2');
}

function task3(callback) {
  asyncOperation(() => callback()); // finally executes the callback
  console.log('tasks 3');
}

// executed when task1, task2 and task3 are completed
task1(() => console.log('tasks 1, 2 and 3 executed'));
