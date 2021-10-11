import 'swiper/swiper-bundle.css'
import ss from './index.module.less'
import birbLogo from '@/assets/img/birb.png'

import React from 'react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useMediaQuery from '@/utils/hooks/useMediaQuery'

SwiperCore.use([Autoplay])

function MainBanner() {
  const isSmall = useMediaQuery('(max-width: 600px)')

  return (
    <div className={ss.banner}>
      <div className={ss.wide}>
        <img src={birbLogo} alt="birbLogo" />
      </div>
      <div className={ss.wide}>
        <img src={birbLogo} alt="birbLogo" />
      </div>
      <div className={ss.wide}>
        <img src={birbLogo} alt="birbLogo" />
      </div>

      <div className={ss.swiper}>
        <Swiper
          loop
          speed={1200}
          slidesPerView={isSmall ? 1 : 3}
          spaceBetween={30}
          autoplay={{ delay: 3500, pauseOnMouseEnter: true, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <div className={ss.prom}>
              <img src={birbLogo} alt="birbLogo" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={ss.prom}>
              <img src={birbLogo} alt="birbLogo" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={ss.prom}>
              <img src={birbLogo} alt="birbLogo" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default MainBanner
