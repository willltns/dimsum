import { ReactComponent as Hot } from '@/assets/img/hot.svg'
import { ReactComponent as Best } from '@/assets/img/best.svg'
import { ReactComponent as New } from '@/assets/img/new.svg'
import { ReactComponent as Presale } from '@/assets/img/presale.svg'
import { ReactComponent as Airdrop } from '@/assets/img/airdrop.svg'

export const getCoinTypeList = (language) => [
  {
    value: 1,
    text: (
      <>
        <Hot /> {language.s1}
      </>
    ),
  },
  {
    value: 2,
    text: (
      <>
        <Best />️ {language.s2}
      </>
    ),
  },
  {
    value: 3,
    text: (
      <>
        <New />️ {language.s3}
      </>
    ),
  },
  {
    value: 4,
    text: (
      <>
        <Presale /> {language.s4}
      </>
    ),
  },
  {
    value: 5,
    text: (
      <>
        <Airdrop /> {language.s5}
      </>
    ),
  },
]
