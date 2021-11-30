import rootStore from '@/stores'

const aA = 'abcdefgABCDEFG'
const hH = 'hijklmnHIJKLMN'
const oO = 'opqrstOPQRST'
const tT = 'uvwxyzUVWXYZ'
// var all = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function encrypt(obj) {
  const { id = 'yyds', coinName, optionDesc } = obj || {}
  const CO = coinName || optionDesc || ''
  const ICO = '' + id + CO

  let strArr = []
  // 去掉空格
  for (let i = 0; i < ICO.length; i++) {
    if (ICO[i] !== ' ') strArr.push(ICO[i])
  }
  for (let i = 0; i < (strArr.length / 2 + '').split('.')[0]; i++) {
    ;[strArr[i], strArr[strArr.length - 1 - i]] = [strArr[strArr.length - 1 - i], strArr[i]]
  }

  let final = Math.random().toString(36).slice(2).replace(/\d/g, '')
  final += Math.random().toString(36).slice(2).replace(/\d/g, '').slice(0, 8)
  let indexes = ''
  for (let i = strArr.length; i > 0; i--) {
    let noop = true
    while (noop) {
      const temp = Math.random().toString(36).slice(2, 8)
      if (temp.includes(strArr[i - 1])) {
        indexes += final.length + temp.indexOf(strArr[i - 1])
        final += temp
        noop = false
      }
      if (Math.random() > 0.888) final += temp
    }

    // eslint-disable-next-line no-loop-func
    final = rootStore.common.mixUp({ id, strArr, i, aA, hH, indexes, final })
  }
  indexes = indexes.replace(/1/g, aA[Math.round(Math.random() * (aA.length - 1))])
  indexes = indexes.replace(/2/g, hH[Math.round(Math.random() * (hH.length - 1))])
  indexes = indexes.replace(/3/g, oO[Math.round(Math.random() * (oO.length - 1))])
  indexes += tT[Math.round(Math.random() * (tT.length - 1))]

  return new Array(...(final + indexes)).reverse().join('')
}

// export function validate(randomCode, numStr) {
//   let head = ''
//   let s = ''
//
//   // 取出第一位和最后一位，其余 reverse
//   for (let i = randomCode.length - 1; i >= 0; i--) {
//     if (i === 0) break
//     else if (i === randomCode.length - 1) head = randomCode[i]
//     else s += randomCode[i]
//   }
//
//   // 第一位和最后一位中有一个数字，该数字表示需要从 s 字符串尾部截取的长度是几位数
//   let len
//   let slicedStr
//
//   if (aA.includes(head)) head = 1
//   if (hH.includes(head)) head = 2
//   len = Number(s.slice(0, Number(head)))
//   s = s.slice(Number(head))
//   slicedStr = s.slice(-len)
//   s = s.slice(0, -len)
//
//   // slicedStr 中若有 字母，根据约定规则转为数字
//   let indexesStr = ''
//   for (let i = 0; i < slicedStr.length; i++) {
//     const char = slicedStr[i]
//     if (!isNaN(char)) {
//       indexesStr += char
//       continue
//     }
//     if (aA.includes(char)) indexesStr = indexesStr + '1'
//     if (hH.includes(char)) indexesStr = indexesStr + '2'
//     if (oO.includes(char)) indexesStr = indexesStr + '3'
//   }
//
//   // 提取 id
//   let extractId = ''
//   let storedPos = 0
//   let min = -1
//   for (let i = 0; i < numStr.length; i++) {
//     let char = numStr[i]
//     let tempIndex = ''
//
//     for (let i = storedPos; i < indexesStr.length; i++) {
//       tempIndex = tempIndex + indexesStr[i]
//       if (char === s[tempIndex] && min < tempIndex) {
//         extractId += s[tempIndex]
//         storedPos = i + 1
//         min = Number(tempIndex)
//         tempIndex = ''
//         break
//       }
//     }
//   }
//
//   return extractId === numStr
// }

// var s = encrypt({ id: '3333' })
//
// validate(s, '3333')
