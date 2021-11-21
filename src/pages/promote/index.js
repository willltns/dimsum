import ss from './index.module.less'
import homeIntro from '@/assets/img/home_intro.png'

import React from 'react'

import { tg } from '@/consts'

import Footer from '@/components/footer'

function Promote() {
  return (
    <section>
      <div className={ss.promo}>
        <div className={ss.intro}>
          <div>
            <p>YYDSCoins is the best Chinese coin listing, based on a community rating platform.</p>
            <p>Chinese users are actively voting on their favourite tokens.</p>
            <em>As token developers, we are the site to grow your outreach to Chinese investors.</em>
            <p>Click on "List-a-Project", or see below for more promotional services. </p>
          </div>
          <img src={homeIntro} alt="home page" />
          <img src="/logo.png" alt="logo" />
        </div>

        <h1>How to create a powerful campaign?</h1>

        <div className={ss.promoPkg}>
          <h2>Promote packages and prices</h2>

          <div>
            <span>
              <h4>Promoted coins section</h4>
              <ul>
                <li>1 day promotion - 0.3 BNB</li>
                <li>3 days promotion - 0.7 BNB</li>
                <li>
                  <b>1 week promotion - 1.2 BNB</b>
                </li>
              </ul>
            </span>
            <span>
              <h4>
                Wide header banner (1200px * 150px<i> - 8:1</i>)
              </h4>
              <ul>
                <li>1 day promotion - 0.7 BNB</li>
                <li>3 days promotion - 2 BNB</li>
                <li>
                  <b>1 week promotion - 4 BNB</b>
                </li>
              </ul>
            </span>
          </div>
          <div>
            <span>
              <h4>
                Rotating banner (500px * 210px<i> - 2.38:1</i>)
              </h4>
              <ul>
                <li>1 day promotion - 0.5 BNB</li>
                <li>3 days promotion - 1.3 BNB</li>
                <li>
                  <b>1 week promotion - 2.5 BNB</b>
                </li>
              </ul>
            </span>
            <span>
              <h4>
                Pop-up on all pages (333px * 333px<i> - 1:1</i>)
              </h4>
              <ul>
                <li>1 day promotion - 1 BNB</li>
                <li>
                  <b>3 days promotion - 2 BNB</b>
                </li>
              </ul>
            </span>
          </div>
        </div>

        <div className={ss.contact}>
          <h2> Get 10% discount for any ads!</h2>
          <p>Put a backlink to YYDSCoins on your project website and receive a 10% discount for any ad package!</p>
          <p>
            For any questions, or to get your coin promoted, feel free to hit us up on Telegram{' '}
            <a href={tg} target="_blank" rel="noreferrer">
              @YYDSCoinsPromo
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </section>
  )
}

export default Promote
