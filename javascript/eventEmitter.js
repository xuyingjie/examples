function eventEmitter() {

}


class EE {
  constructor() {
    this.list = {}
  }

  on(name, callback, once = false) {
    if (!this.list[name]) this.list[name] = []
    this.list[name].push({ once, callback })
  }

  off(name) {
    this.list[name] = null
  }

  emit(name) {
    if (!this.list[name]) return
    let eventList = this.list[name]
    eventList.forEach(item => item.callback())
    this.list[name] = eventList.filter(item => !item.once)
  }

  once(name, callback) {
    this.on(name, callback, true)
  }
}
