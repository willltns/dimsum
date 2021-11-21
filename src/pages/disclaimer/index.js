import ss from './index.module.less'

import React from 'react'

import Footer from '@/components/footer'

function Disclaimer() {
  return (
    <section className={ss.disclaimer}>
      <h2>免责声明</h2>
      <p>
        我们的网站、超链接网站、相关应用程序、论坛、博客、社交媒体帐户和其他平台（“网站”）在此提供的所有内容均从第三方来源获取，仅供您一般参考。
        我们对我们的内容不作任何形式的保证，包括但不限于准确性和更新性。
        我们提供的任何内容均不构成财务建议、法律建议或任何其他形式的建议来让您出于任何目的而具体依赖。
        对我们内容的任何使用或依赖完全由您自行判断和自行承担风险。
        在依赖我们的内容之前，您应该进行自己的研究、审查、分析和验证。
        交易是一项高风险活动，可能导致重大损失，因此请在做出任何决定前咨询您的财务顾问。
        我们网站上的任何内容均不构成招揽或要约。
      </p>
      <h2 style={{ marginTop: 32 }}>Disclaimer</h2>
      <p>
        All content provided herein our website, hyperlinked sites, associated applications, forums, blogs, social media
        accounts and other platforms (“Site”) is for your general information only, procured from third party sources.
        We make no warranties of any kind in relation to our content, including but not limited to accuracy and
        updatedness. No part of the content that we provide constitutes financial advice, legal advice or any other form
        of advice meant for your specific reliance for any purpose. Any use or reliance on our content is solely at your
        own risk and discretion. You should conduct your own research, review, analyse and verify our content before
        relying on them. Trading is a highly risky activity that can lead to major losses, please therefore consult your
        financial advisor before making any decision. No content on our site is meant to be a solicitation or offer.
      </p>
      <Footer />
    </section>
  )
}

export default Disclaimer
