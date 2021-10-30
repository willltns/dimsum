import { ReactComponent as Hot } from '@/assets/img/hot.svg'
import { ReactComponent as Best } from '@/assets/img/best.svg'
import { ReactComponent as New } from '@/assets/img/new.svg'
import { ReactComponent as Presale } from '@/assets/img/presale.svg'
import { ReactComponent as Airdrop } from '@/assets/img/airdrop.svg'

export const coinTypeList = [
  {
    value: 1,
    text: (
      <>
        <Hot /> 今日热门
      </>
    ),
  },
  {
    value: 2,
    text: (
      <>
        <Best />️ 历史最佳
      </>
    ),
  },
  {
    value: 3,
    text: (
      <>
        <New />️ 新币
      </>
    ),
  },
  {
    value: 4,
    text: (
      <>
        <Presale /> 预售
      </>
    ),
  },
  {
    value: 5,
    text: (
      <>
        <Airdrop /> 空投
      </>
    ),
  },
]
