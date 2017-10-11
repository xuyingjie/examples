'use strict'

var state = {
  // items: [],
  // setState(arr) {
  //     this.items = arr
  //     render()
  // },
  id: 0,
  _items: [],
  get items() {
    return this._items
  },
  set items(v) {
    this._items = v
    render()
  }
}
// Object.defineProperty(state, 'items', {
//     get: function() {
//         return this._items
//     },
//     set: function(v) {
//         this._items = v
//         render()
//     }
// })


$('#add').on('click', () => {
  var value = $('#input').val().trim()
  $('#input').val('')

  state.items = [...state.items, {
    id: state.id++,
    text: value,
    completed: false
  }]
})

$('#list').on('click', event => {
  var toggleId = parseInt(event.target.id)

  state.items = state.items.map(el => {
    if (el.id === toggleId) {
      el.completed = !el.completed
    }
    return el
  })
})

function render() {
  function itemRow(item) {
    var completed = item.completed ? 'completed' : ''
    return `<li class="item ${completed}" id="${item.id}">(${item.id}) ${item.text}</li>`
  }

  var html = state.items.map(itemRow).join('')

  $('#list').html(html)
}

render()
