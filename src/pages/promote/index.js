import ss from './index.module.less'

import React from 'react'
import Footer from '@/components/footer'

function Promote() {
  return (
    <section>
      <div style={{ padding: 24, backgroundColor: '#fff', borderRadius: 10 }}>
        <h1>Need to boost your marketing efforts?</h1>

        <p>Promote packages and prices</p>

        <div>
          <span>
            <div>
              <p>Promoted coins section</p>
              <ul>
                <li>1 day promotion - 0.3 BNB</li>
                <li>3 days promotion - 0.7 BNB</li>
                <li>5 days promotion - 0.9 BNB</li>
                <li>1 week promotion - 1 BNB</li>
              </ul>
            </div>
            <div>
              <p>Wide header banner (1200px * 150px - 8:1)</p>
              <ul>
                <li>1 day promotion - 0.7 BNB</li>
                <li>3 days promotion - 1.8 BNB</li>
              </ul>
            </div>
          </span>
          <span>
            <div>
              <p>Rotating banner (500px * 210px - 2.38:1)</p>
              <ul>
                <li>1 day promotion - 0.5 BNB</li>
                <li>3 days promotion - 1 BNB</li>
                <li>5 days promotion - 1.5 BNB</li>
                <li>1 week promotion - 2 BNB</li>
              </ul>
            </div>
            <div>
              <p>Pop-up on all pages (333px * 333px - 1:1)</p>
              <ul>
                <li>1 day promotion - 0.8 BNB</li>
                <li>3 days promotion - 1.6 BNB</li>
              </ul>
            </div>
          </span>
        </div>

        <div>
          <h2> Get 10% discount for any ads!</h2>
          <p>Put a backlink to YYDSCoins on your project website and receive a 10% discount for any ad package!</p>
          <p>
            For any questions, or to get your coin promoted, feel free to hit us up: contact@yydscoins.com or on
            Telegram @YYDSCoinsPromo
          </p>
        </div>
      </div>

      <Footer />
    </section>
  )
}

export default Promote
