
// 快速排序
function quickSort(arr) {
  if (arr.length < 2) return arr

  const pivot = arr[0]
  const small = arr.filter(n => n <= pivot)
  const big = arr.filter(n => n > pivot)
  // for (let i = 1; i < arr.length; i++) {
  //   if (arr[i] <= pivot) {
  //     small.push(arr[i])
  //   } else {
  //     big.push(arr[i])
  //   }
  // }
  return [...quickSort(small), ...quickSort(big)]
}

