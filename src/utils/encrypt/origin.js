var aA = 'abcdefgABCDEFG'
var hH = 'hijklmnHIJKLMN'
var oO = 'opqrstOPQRST'
var tT = 'uvwxyzUVWXYZ'
var all = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function encrypt(obj) {
  const { id, coinName, optionDesc } = obj || {}
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

    if (strArr.length - i + 1 >= `${id}`.length) {
      let digit = `${indexes.length}`.length + ''
      digit = digit.replace(/1/g, aA[Math.round(Math.random() * (aA.length - 1))])
      digit = digit.replace(/2/g, hH[Math.round(Math.random() * (hH.length - 1))])
      final = digit + indexes.length + final
      break
    }
  }
  indexes = indexes.replace(/1/g, aA[Math.round(Math.random() * (aA.length - 1))])
  indexes = indexes.replace(/2/g, hH[Math.round(Math.random() * (hH.length - 1))])
  indexes = indexes.replace(/3/g, oO[Math.round(Math.random() * (oO.length - 1))])
  indexes += tT[Math.round(Math.random() * (tT.length - 1))]

  return new Array(...(final + indexes)).reverse().join('')
}

function decrypt(str, id) {
  let head = ''
  let s = ''
  let tail = ''

  // 取出第一位和最后一位，其余 reverse
  for (let i = str.length - 1; i >= 0; i--) {
    if (i === 0) tail = str[i]
    else if (i === str.length - 1) head = str[i]
    else s += str[i]
  }

  // 第一位和最后一位中有一个数字，该数字表示需要从 s 字符串尾部截取的长度是几位数
  let len
  let slicedStr

  if (aA.includes(head)) head = 1
  if (hH.includes(head)) head = 2
  len = +s.slice(0, +head)
  s = s.slice(+head)
  slicedStr = s.slice(-len)
  s = s.slice(0, -len)

  // slicedStr 中若有 字母，根据约定规则转为数字
  let indexesStr = ''
  for (let i = 0; i < slicedStr.length; i++) {
    const char = slicedStr[i]
    if (!isNaN(char)) {
      indexesStr += char
      continue
    }
    if (aA.includes(char)) indexesStr += 1
    if (hH.includes(char)) indexesStr += 2
    if (oO.includes(char)) indexesStr += 3
  }

  console.log(str, s, indexesStr)

  // 提取 id
  let extractId = ''
  let storedPos = 0
  let min = -1
  for (let i = 0; i < id.length; i++) {
    let char = id[i]
    let tempIndex = ''

    for (let i = storedPos; i < indexesStr.length; i++) {
      tempIndex += indexesStr[i]
      if (char === s[tempIndex] && min < tempIndex) {
        extractId += s[tempIndex]
        storedPos = i + 1
        min = +tempIndex
        tempIndex = ''
        break
      }
    }
  }

  console.log('extractId', extractId)

  return extractId === id
}

var s = encrypt({ id: 3333 })

decrypt(s, '3333')
