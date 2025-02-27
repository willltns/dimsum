import ss from './index.module.less'
// import promoEn from '@/assets/img/yy-promo-en.png'
// import promoZh from '@/assets/img/yy-promo-zh.png'

import React from 'react'
import { Image } from 'antd'
import { observer } from 'mobx-react'

import { fileDomain, tg } from '@/consts'
import { useStore } from '@/utils/hooks/useStore'
import zh from './lang/zh.json'
import en from './lang/en.json'

import Footer from '@/components/footer'
import ReferralForm from './ReferralForm'
import YYPopover from '@/components/yy-popover'

function Promote() {
  const { common } = useStore()

  const lang = common.isZH ? zh : en

  return (
    <section>
      <div className={ss.promo}>
        <div className={ss.intro}>
          <div>
            <p>{lang.siteDesc1}</p>
            <p>{lang.siteDesc2}</p>
            <em>{lang.siteDesc3}</em>
            <p>{lang.siteDesc4}</p>
          </div>
          <YYPopover visible placement="bottom" content={lang.clickZoom}>
            <Image
              src={`${fileDomain}images/${common.isZH ? 'yy-promo-zh.png' : 'yy-promo-en.png'}`}
              alt="promo-intro"
              className={ss.homeImg}
            />
          </YYPopover>

          <img src="/logo.png" alt="logo" />
        </div>

        <h1>{lang.title}</h1>

        <div className={ss.promoPkg}>
          <h2>{lang.priceTitle}</h2>

          <div>
            <span>
              <h4>{lang.promoCoin}</h4>
              <ul>
                <li>1 {lang.day1Unit} - 0.3 BNB</li>
                <li>3 {lang.day3Unit} - 0.7 BNB</li>
                <li>
                  <b>1 {lang.day7Unit} - 1.2 BNB</b>
                </li>
              </ul>
            </span>
            <span>
              <h4>
                {lang.wideB} (1200px * 150px<i> - 8:1</i>)
              </h4>
              <ul>
                <li>1 {lang.day1Unit} - 0.7 BNB</li>
                <li>3 {lang.day3Unit} - 2 BNB</li>
                <li>
                  <b>1 {lang.day7Unit} - 4 BNB</b>
                </li>
              </ul>
            </span>
          </div>
          <div>
            <span>
              <h4>
                {lang.rotatingB} (500px * 210px<i> - 2.38:1</i>)
              </h4>
              <ul>
                <li>1 {lang.day1Unit} - 0.5 BNB</li>
                <li>3 {lang.day3Unit} - 1.3 BNB</li>
                <li>
                  <b>1 {lang.day7Unit} - 2.5 BNB</b>
                </li>
              </ul>
            </span>
            <span>
              <h4>
                {lang.popUpB} (333px * 333px<i> - 1:1</i>)
              </h4>
              <ul>
                <li>1 {lang.day1Unit} - 1 BNB</li>
                <li>
                  <b>3 {lang.day3Unit} - 2 BNB</b>
                </li>
              </ul>
            </span>
          </div>
        </div>

        <div className={ss.contact}>
          <h2>{lang.discount}</h2>
          <p>{lang.dcDesc}</p>
          <p>
            {lang.pr}{' '}
            <a href={tg} target="_blank" rel="noreferrer">
              @yydscoins
            </a>
          </p>
        </div>

        <div className={ss.line} />

        <ReferralForm />
      </div>

      <Footer />
    </section>
  )
}

export default observer(Promote)
