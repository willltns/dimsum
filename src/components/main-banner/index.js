import 'swiper/swiper-bundle.css'
import ss from './index.module.less'
import birbLogo from '@/assets/img/birb.png'

import React from 'react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useStore } from '@/utils/hooks/useStore'
import useMediaQuery from '@/utils/hooks/useMediaQuery'

SwiperCore.use([Autoplay])

function MainBanner() {
  const isSmall = useMediaQuery('(max-width: 600px)')

  const { common } = useStore()
  const { wideBannerList, scrollBannerList } = common

  return (
    <div className={ss.banner}>
      {wideBannerList?.map((banner) => (
        <div className={ss.wide} key={banner.bannerUrl}>
          <a href={banner.linkUrl} target="_blank" rel="noreferrer">
            <img src={banner.bannerUrl} alt={banner.coinName} />
          </a>
        </div>
      ))}

      <div className={ss.swiper}>
        <Swiper
          loop
          speed={1200}
          slidesPerView={isSmall ? 1 : 3}
          spaceBetween={30}
          autoplay={{ delay: 3500, pauseOnMouseEnter: true, disableOnInteraction: false }}
        >
          {scrollBannerList?.map((item) => (
            <SwiperSlide key={item.bannerUrl}>
              <div className={ss.prom}>
                <a href={item.linkUrl} target="_blank" rel="noreferrer">
                  <img src={item.bannerUrl} alt={item.coinName} />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default MainBanner
