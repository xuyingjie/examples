// 归并排序
// https://en.wikipedia.org/wiki/Merge_sort
function mergeSort(arr) {
  if (arr.length < 2) return arr

  let mid = Math.ceil(arr.length / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let out = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      out.push(left.shift())
    } else {
      out.push(right.shift())
    }
  }
  return [...out, ...left, ...right]
}

let arr = [23, 89, -23, 3, 5, 1, 6, 4, 56, 78, 23, 9]
console.log(mergeSort(arr))
console.log(mergeSort([4, 3]))
console.log(mergeSort([3]))
console.log(mergeSort([]))
