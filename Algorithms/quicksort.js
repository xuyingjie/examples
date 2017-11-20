
// 快速排序
function quickSort(arr) {
  if (arr.length < 2) return arr

  const mid = Math.floor(arr.length / 2)
  const pivot = arr.splice(mid, 1)[0]
  const small = arr.filter(n => n <= pivot)
  const big = arr.filter(n => n > pivot)
  return [...quickSort(small), pivot, ...quickSort(big)]
}

let arr = [23, 89, -23, 3, 5, 1, 6, 4, 56, 78, 23, 9]
console.log(quickSort(arr))
