
// 'hello.world.eq=hw&&sta.stop.propagation=com&&here.is.preventDefault.object=ccc'
// '{"hello":{"world":{"eq":"hw"}},"sta":{"stop":{"propagation":"com"}},"here":{"is":{"preventDefault":{"object":"ccc"}}}}'


var url = 'hello.world.eq=hw&&sta.stop.propagation=com&&here.is.preventDefault.object=ccc'
var arr = url.split('&&')
var arr2 = arr.map(x => x.split('.'))
var arr3 = arr2.map(x => {

  var last = x.pop().split('=')
  var obj = {
    [last[0]]: last[1]
  }

  while (x.length > 0) {
    obj = {
      [x.pop()]: obj
    }
  }
  return obj
})

var out = Object.assign.apply(null, arr3)
console.log(JSON.stringify(out))