
// 关于本地存储的构造函数
function Record() {
  if(!localStorage.record) {
    // 为什么这里的空数组还有带上引号呢？
    // 因为本地存储只能存储字符串,可以将对象JSON.stringify()编码后存储，或者通过JSON.parse()解析后获取数据
    localStorage.record = '[]'
  }
}

// 获得缓存的记录内容
Record.prototype.getRecords = function() {
  return JSON.parse(localStorage.record);
}

// 添加新数据
Record.prototype.addData = function(data) {
  // 先拿到数据 添加数据 更新缓存
  var arr = this.getRecords();
  arr.push(data);
  localStorage.record = JSON.stringify(arr);
}

// 清除所有数据
Record.prototype.removeAllData = function() {
  localStorage.clear();
}

// 删掉指定数据
Record.prototype.delData = function(index) {
  var arr = this.getRecords();
  arr.splice(index, 1);
  // 删除后记得更新缓存
  localStorage.record = JSON.stringify(arr);
}

// 计算总收入
Record.prototype.income = function() {
  var total = 0;
  var arr = this.getRecords();
  arr.forEach(data => {
    if(data.type === '+') {
      total += data.money / 1;
    }
  })

  return total;
}

// 计算总支出
Record.prototype.cost = function() {
  var total = 0;
  var arr = this.getRecords();
  arr.forEach(data => {
    if(data.type === '-') {
      total += data.money / 1;
    }
  })

  return total;
}