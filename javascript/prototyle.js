// > 原型是一个函数特征。

function SuperType(name) {
  this.name = name
}
SuperType.prototype.getName = function () {
  return this.name
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}
SubType.prototype = Object.create(SuperType.prototype)
SubType.prototype.getAge = function () {
  return this.age
}



// ## es2015 version

class SuperType {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

class SubType extends SuperType {
  constructor(name, age) {
    super(name)  // 调用父类的constructor
    this.age = age
  }

  getAge() {
    return this.age
  }
}

let obj = new SubType('k', 24)
assert(obj.getName() === 'k', 'getName')
assert(obj.getAge() === 24, 'getAge')