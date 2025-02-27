import 'swiper/swiper-bundle.css'
import ss from './index.module.less'

import React from 'react'
import dayjs from 'dayjs'
import { observer } from 'mobx-react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { fileDomain } from '@/consts'
import { shuffle } from '@/utils/arrayShuffle'
import { useStore } from '@/utils/hooks/useStore'
import useMediaQuery from '@/utils/hooks/useMediaQuery'

SwiperCore.use([Autoplay])

function MainBanner() {
  const isHomePage = window.location.pathname === '/'
  const isSmall = useMediaQuery('(max-width: 600px)')

  const { common } = useStore()
  const { wideBannerList, scrollBannerList } = common

  // const wideList = (wideBannerList || [])
  //   .slice()
  //   .sort((a, b) => (dayjs(a.shelfTime).isAfter(dayjs(b.shelfTime)) ? -1 : 1))
  // const scrollList = (scrollBannerList || [])
  //   .slice()
  //   .sort((a, b) => (dayjs(a.shelfTime).isAfter(dayjs(b.shelfTime)) ? -1 : 1))

  let wideList = (wideBannerList || []).slice()
  let scrollList = (scrollBannerList || []).slice()

  wideList = wideList.sort((a, b) => (dayjs(a.shelfTime).isAfter(dayjs(b.shelfTime)) ? -1 : 1))
  scrollList = scrollList.sort((a, b) => (dayjs(a.shelfTime).isAfter(dayjs(b.shelfTime)) ? -1 : 1))

  if (!isHomePage) wideList = shuffle(wideList)
  if (isSmall) scrollList = shuffle(scrollList)

  return (
    <div className={ss.banner}>
      {isHomePage ? (
        wideList?.map((banner) => (
          <div className={ss.wide} key={banner.bannerUrl}>
            <a href={banner.linkUrl} target="_blank" rel="noreferrer">
              <img src={fileDomain + banner.bannerUrl} alt={banner.coinName} />
            </a>
          </div>
        ))
      ) : (
        <div className={ss.verticalSwiper}>
          <Swiper
            loop
            speed={1500}
            spaceBetween={1}
            slidesPerView={1}
            direction="vertical"
            autoplay={{ delay: 4500, pauseOnMouseEnter: true, disableOnInteraction: false }}
          >
            {wideList?.map((item) => (
              <SwiperSlide key={item.bannerUrl}>
                <div className={ss.wide} key={item.bannerUrl}>
                  <a href={item.linkUrl} target="_blank" rel="noreferrer">
                    <img src={fileDomain + item.bannerUrl} alt={item.coinName} />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className={ss.swiper}>
        <Swiper
          loop
          speed={1500}
          slidesPerView={isSmall ? 1 : 3}
          spaceBetween={isSmall ? 8 : 30}
          autoplay={{ delay: 4500, pauseOnMouseEnter: true, disableOnInteraction: false }}
        >
          {scrollList?.map((item) => (
            <SwiperSlide key={item.bannerUrl}>
              <div className={ss.prom}>
                <a href={item.linkUrl} target="_blank" rel="noreferrer">
                  <img src={fileDomain + item.bannerUrl} alt={item.coinName} />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default React.memo(observer(MainBanner))
