import { urlReg } from '@/consts'

export function findExtraLinkByName(extraStr, searchName) {
  if (!extraStr?.trim() || !searchName) return

  const links = extraStr
    .split('\n')
    .map((s) => s.split('$$$'))
    .filter(([n, l]) => !!n?.trim() && urlReg.test(l))

  return links.find(([name]) => name.toLowerCase().indexOf(searchName.toLowerCase()) > -1)
}
