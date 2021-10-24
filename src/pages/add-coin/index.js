import ss from './index.module.less'

import React, { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Select, Modal } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import zh from './lang/zh.json'
import en from './lang/en.json'
import { urlReg } from '@/consts'
import { descPH, presalePH, airdropPH, presaleTemplate, airdropTemplate, additionalLinkPH } from './const'

import Footer from '@/components/footer'
import { addCoin, getChainList } from '@/assets/xhr'
import ImgUpload, { uploadErrorValidator } from '@/components/img-upload'

// 是否中文
const ifZh = (lang) => lang === 'zh'

// 日期格式校验 2022-22-22 22:22
const dateReg =
  /^(((20\d{2})-(0(1|[3-9])|1[012])-(0[1-9]|[12]\d|30))|((20\d{2})-(0[13578]|1[02])-31)|((20\d{2})-02-(0[1-9]|1\d|2[0-8]))|(((20([13579][26]|[2468][048]|0[48]))|(2000))-02-29))\s([0-1][0-9]|2[0-3]):([0-5][0-9])$/

const scrollToError = (el) => {
  const topOffset = el.getBoundingClientRect().top
  const addonTop = window.innerWidth < 1100 ? 66 : 6
  if (topOffset >= addonTop) return
  let scrollOffset = topOffset - addonTop
  window.scrollBy({ top: scrollOffset, left: 0 })
}

function AddCoin() {
  const history = useHistory()

  const uploadBtnRef = useRef(null)
  const linkTipRef = useRef(null)

  const [state, setState] = useState({
    lang: 'zh',
    loading: false,
    coinChainList: [],
    coinPresaleInfo: '',
    coinAirdropInfo: '',
    presaleModalVisible: false,
    airdropModalVisible: false,
  })
  const { lang, loading, coinChainList, coinPresaleInfo, coinAirdropInfo, presaleModalVisible, airdropModalVisible } =
    state

  useEffect(() => {
    getChainList()
      .then((res) => setState((state) => ({ ...state, coinChainList: res?.list || [] })))
      .catch(() => {})
  }, [])

  const tt = ifZh(lang) ? zh : en

  const onFinish = (values) => {
    const { linkWebsite, linkChineseTg, linkEnglishTg, linkTwitter, linkMedium, linkDiscord, linkAdditionalInfo } =
      values
    if (
      [linkWebsite, linkChineseTg, linkEnglishTg, linkTwitter, linkMedium, linkDiscord, linkAdditionalInfo].every(
        (i) => !i
      )
    ) {
      linkTipRef.current.style.opacity = 1
      scrollToError(linkTipRef.current.parentNode)
      return
    }

    setState((state) => ({ ...state, loading: true }))

    const params = { ...values, coinPresaleInfo, coinAirdropInfo, linkAdditionalInfo: linkAdditionalInfo?.trim() || '' }
    params.coinLogo = params.coinLogo?.[0]?.response

    addCoin(params)
      .then(() => {
        // success
        Modal.success({
          closable: false,
          onOk: () => history.replace('/'),
          content: (
            <div>
              <p>您提交的代币 xxx 已成功提交，请等待审核，将在12小时内完成审核</p>
              <p>如需修改和推广您的代币，请联系 xxx@xxxxx.com</p>
            </div>
          ),
        })
      })
      .catch(() => setState((state) => ({ ...state, loading: false })))
  }

  const onFinishFailed = ({ values, errorFields }) => {
    if (!values?.logo?.[0]) uploadBtnRef.current.style = 'border-color: #ff4d4f; box-shadow: 0 0 2px #ff4d4f'

    const firstErrorLabel = errorFields?.[0]?.name
    if (!firstErrorLabel) return
    const errorEl = document.querySelector(`label[for="${firstErrorLabel}"]`)
    if (errorEl) scrollToError(errorEl)
  }

  return (
    <section className={ss.addCoin}>
      <div className={ss.head}>
        <Link replace to="/">
          <ArrowLeftOutlined /> {tt.backText}
        </Link>
        <div onClick={() => setState((state) => ({ ...state, lang: ifZh(lang) ? 'en' : 'zh' }))}>
          <span className={ifZh(lang) ? '' : ss.selected}>En</span> /{' '}
          <span className={ifZh(lang) ? ss.selected : ''}>中</span>
        </div>
      </div>

      <Form
        layout="vertical"
        autoComplete="off"
        className={ss.form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={{ required: ` `, whitespace: ` `, pattern: { mismatch: ` ` } }}
        onValuesChange={(changedValue, allValues) => {
          // prettier-ignore
          const atLeastOne = ['linkWebsite', 'linkChineseTg', 'linkEnglishTg', 'linkTwitter', 'linkMedium', 'linkDiscord', 'linkAdditionalInfo',]
          if (!atLeastOne.includes(Object.keys(changedValue)[0])) return
          linkTipRef.current.style.opacity = atLeastOne.every((key) => !allValues[key]) ? 1 : 0
        }}
        initialValues={{ coinLaunchDate: '2021-00-00 00:00' }}
      >
        <Row className={ifZh(lang) ? ss.zhMode : ss.enMode}>
          <Col>
            <Form.Item noStyle>
              <h2>{tt.coinInfoTitle}</h2>
            </Form.Item>
            <Form.Item label={tt.name} name="coinName" rules={[{ required: true, whitespace: true }]}>
              <Input placeholder="e.g. Bitcoin" />
            </Form.Item>
            <Form.Item label={tt.symbol} name="coinSymbol" rules={[{ required: true, whitespace: true }]}>
              <Input placeholder="e.g. BTC" />
            </Form.Item>
            <Form.Item
              label={tt.logo}
              name="coinLogo"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
              rules={[{ required: true }, uploadErrorValidator]}
            >
              <ImgUpload iconRef={uploadBtnRef} onClick={() => (uploadBtnRef.current.style = '')} />
            </Form.Item>
            <Form.Item label={tt.description} name="coinDescription" rules={[{ required: true, whitespace: true }]}>
              <Input.TextArea autoSize={{ minRows: 8 }} placeholder={descPH} />
            </Form.Item>
            <Form.Item
              label={tt.launchDate}
              name="coinLaunchDate"
              validateTrigger="onBlur"
              rules={[{ required: true }, { pattern: dateReg, message: ' ' }]}
            >
              <Input placeholder="YYYY-MM-DD HH:mm" />
            </Form.Item>

            <Form.Item noStyle>
              <h2>{tt.contractInfoTitle}</h2>
            </Form.Item>
            <Form.Item label={tt.chain} name="coinChain" rules={[{ required: true }]}>
              <Select placeholder="Select..." getPopupContainer={(tri) => tri.parentNode}>
                {coinChainList?.map(({ chainName, id }) => (
                  <Select.Option value={id} key={id}>
                    {chainName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label={tt.contractAddress} name="coinAddress" rules={[{ whitespace: true }]}>
              <Input placeholder="0x0000...." />
            </Form.Item>

            <Form.Item noStyle>
              <h2>{tt.presale_airdrop}</h2>
              <div className={ss.paBtns}>
                <Button
                  className={`${coinPresaleInfo ? ss.infoFilled : ''}`}
                  onClick={() => setState((state) => ({ ...state, presaleModalVisible: true }))}
                >
                  {tt.presaleInformation}
                </Button>

                <Button
                  className={`${coinAirdropInfo ? ss.infoFilled : ''}`}
                  onClick={() => setState((state) => ({ ...state, airdropModalVisible: true }))}
                >
                  {tt.airdropInformation}
                </Button>
              </div>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item noStyle>
              {/* prettier-ignore */}
              <h2>{tt.linkTitle}<span className={ss.linkTip} ref={linkTipRef}>{tt.linkTip}</span></h2>
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.website} name="linkWebsite" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." />
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.chineseTG} name="linkChineseTg" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." />
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.englishTG} name="linkEnglishTg" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." />
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.twitter} name="linkTwitter" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." />
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.medium} name="linkMedium" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." />
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.discord} name="linkDiscord" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." />
            </Form.Item>
            <Form.Item label={tt.addLinkInfo} name="linkAdditionalInfo" rules={[{ whitespace: true }]}>
              <Input.TextArea autoSize={{ minRows: 6 }} placeholder={additionalLinkPH} />
            </Form.Item>

            <Form.Item noStyle>
              <h2>{tt.contactInfoTitle}</h2>
            </Form.Item>
            <Form.Item
              label={tt.contactEmail}
              name="contactEmail"
              validateTrigger="onBlur"
              rules={[{ required: true }, { type: 'email' }]}
            >
              <Input placeholder="contact@yydscoins.com" />
            </Form.Item>
            <Form.Item label={tt.contactTelegram} name="contactTg" rules={[{ whitespace: true }]}>
              <Input placeholder="@yydscoins" />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button htmlType="submit" className={ss.submitBtn}>
            {tt.addCoin}
          </Button>
        </div>
      </Form>

      <Footer />

      {/* 预售信息补充弹窗 */}
      <Modal footer={null} closable={false} keyboard={false} className={ss.paModal} visible={presaleModalVisible}>
        <div className={ss.modalHead}>
          <p>{tt.presaleInformation}</p>
          <Button
            type="link"
            disabled={!!coinPresaleInfo.trim()}
            onClick={() => setState((state) => ({ ...state, coinPresaleInfo: presaleTemplate }))}
          >
            {tt.injectTemplate}
          </Button>
        </div>
        <Input.TextArea
          value={coinPresaleInfo}
          placeholder={presalePH}
          onChange={(e) => setState((state) => ({ ...state, coinPresaleInfo: e.target.value }))}
          autoSize={{ minRows: 10 }}
        />
        {/* prettier-ignore */}
        <Button type="primary" onClick={() => setState((state) => ({ ...state, coinPresaleInfo: state.coinPresaleInfo.trim(), presaleModalVisible: false }))}>OK</Button>
      </Modal>

      {/* 空投信息补充弹窗 */}
      <Modal footer={null} closable={false} keyboard={false} className={ss.paModal} visible={airdropModalVisible}>
        <div className={ss.modalHead}>
          <p>{tt.airdropInformation}</p>
          <Button
            type="link"
            disabled={!!coinAirdropInfo.trim()}
            onClick={() => setState((state) => ({ ...state, coinAirdropInfo: airdropTemplate }))}
          >
            {tt.injectTemplate}
          </Button>
        </div>
        <Input.TextArea
          value={coinAirdropInfo}
          placeholder={airdropPH}
          autoSize={{ minRows: 10 }}
          onChange={(e) => setState((state) => ({ ...state, coinAirdropInfo: e.target.value }))}
        />
        {/* prettier-ignore */}
        <Button type="primary" loading={loading} onClick={() => setState((state) => ({ ...state, coinAirdropInfo: state.coinAirdropInfo.trim(), airdropModalVisible: false }))}>{tt.okBtnText}</Button>
      </Modal>
    </section>
  )
}

export default AddCoin
