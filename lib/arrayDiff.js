'use strict'

var FLAGS = {
  REMOVED: '1',
  COMMON: '0',
  ADDED: '2'
}

function arrayDiff (orig, dist, id) {
  var _deltaMap = {}
  var _objHolder = {}

  orig.forEach(function (item) {
    var key = get(item, id)
    _objHolder[key] = item
    _deltaMap[key] = FLAGS.REMOVED
  })

  dist.forEach(function (item) {
    var key = get(item, id)
    _objHolder[key] = item
    var flag = _deltaMap[key]
    if (flag === FLAGS.REMOVED) _deltaMap[key] = FLAGS.COMMON
    else _deltaMap[key] = FLAGS.ADDED
  })

  var delta = { added: [], removed: [], common: [] }

  Object.keys(_deltaMap).forEach(function (id) {
    var value = _deltaMap[id]
    var store
    if (value === FLAGS.REMOVED) store = delta.removed
    else if (value === FLAGS.ADDED) store = delta.added
    else if (value === FLAGS.COMMON) store = delta.common
    store.push(_objHolder[id])
  })

  return delta
}

function get (item, id) {
  if (!id) return item
  if (typeof id === 'string') return item[id]
  if (typeof id === 'function') return id(item)
  throw TypeError('Property selector should either be a property name or selector function.');
}

module.exports = arrayDiff
