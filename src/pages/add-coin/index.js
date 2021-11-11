import ss from './index.module.less'
import { ReactComponent as TgIcon } from '@/assets/img/link-icon/tg.svg'
import { ReactComponent as RocketIcon } from '@/assets/img/link-icon/rocket.svg'
import Logo from '@/assets/img/YYDS_LOGO_HOR.png'

import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Select, Modal } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'

import zh from './lang/zh.json'
import en from './lang/en.json'
import { tg, urlReg } from '@/consts'
import { descPH, presalePH, airdropPH, presaleTemplate, airdropTemplate, additionalLinkPH } from './const'

import Footer from '@/components/footer'
import { addCoin } from '@/assets/xhr'
import ImgUpload, { handleFileUpload } from '@/components/img-upload'
import { useStore } from '@/utils/hooks/useStore'

// 日期格式校验 2022-22-22 22:22
const dateReg =
  /^(((20\d{2})-(0(1|[3-9])|1[012])-(0[1-9]|[12]\d|30))|((20\d{2})-(0[13578]|1[02])-31)|((20\d{2})-02-(0[1-9]|1\d|2[0-8]))|(((20([13579][26]|[2468][048]|0[48]))|(2000))-02-29))\s([0-1][0-9]|2[0-3]):([0-5][0-9])$/

const scrollToError = (el) => {
  const topOffset = el.getBoundingClientRect().top
  const addonTop = 66 // window.innerWidth < 1110 ? 66 : 6
  if (topOffset >= addonTop) return
  let scrollOffset = topOffset - addonTop
  window.scrollBy({ top: scrollOffset, left: 0 })
}

function AddCoin() {
  const history = useHistory()
  const { common } = useStore()

  const uploadBtnRef = useRef(null)
  const linkTipRef = useRef(null)
  const addSecRef = useRef(null)

  const [state, setState] = useState({
    loading: false,
    coinPresaleInfo: '',
    coinAirdropInfo: '',
    presaleModalVisible: false,
    airdropModalVisible: false,
  })
  const { loading, coinPresaleInfo, coinAirdropInfo, presaleModalVisible, airdropModalVisible } = state

  const tt = common.isZH ? zh : en

  const onFinish = async (values) => {
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

    try {
      const params = {
        ...values,
        coinPresaleInfo,
        coinAirdropInfo,
        linkAdditionalInfo: linkAdditionalInfo?.trim() || '',
      }
      params.coinLogo = await handleFileUpload(values.coinLogo[0]?.originFileObj)

      await addCoin(params)

      afterAdd(tt, history, addSecRef.current)
    } catch (err) {
      setState((state) => ({ ...state, loading: false }))
    }
  }

  const onFinishFailed = ({ values, errorFields }) => {
    if (!values?.coinLogo?.[0])
      uploadBtnRef.current.parentNode.parentNode.style = 'border-color: #ff4d4f; box-shadow: 0 0 2px #ff4d4f'

    const firstErrorLabel = errorFields?.[0]?.name
    if (!firstErrorLabel) return
    const errorEl = document.querySelector(`label[for="${firstErrorLabel}"]`)
    if (errorEl) scrollToError(errorEl)
  }

  return (
    <section className={ss.addCoin} ref={addSecRef}>
      <div className={ss.head}>
        <Link replace to="/">
          <ArrowLeftOutlined /> {tt.backText}
        </Link>
      </div>

      <Form
        layout="vertical"
        autoComplete="off"
        className={ss.form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={{ required: ` `, whitespace: ` `, pattern: { mismatch: ` ` }, types: { email: ` ` } }}
        onValuesChange={(changedValue, allValues) => {
          // prettier-ignore
          const atLeastOne = ['linkWebsite', 'linkChineseTg', 'linkEnglishTg', 'linkTwitter', 'linkMedium', 'linkDiscord', 'linkAdditionalInfo',]
          if (!atLeastOne.includes(Object.keys(changedValue)[0])) return
          linkTipRef.current.style.opacity = atLeastOne.every((key) => !allValues[key]) ? 1 : 0
        }}
        initialValues={{
          coinLaunchDate: '2021-00-00 00:00',
          coinPresaleDate: '2021-00-00 00:00',
          coinAirdropDate: '2021-00-00 00:00',
        }}
      >
        <Row className={common.isZH ? ss.zhMode : ss.enMode}>
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
              rules={[{ required: true }]}
            >
              <ImgUpload
                iconRef={uploadBtnRef}
                onClick={() => (uploadBtnRef.current.parentNode.parentNode.style = '')}
              />
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
                {common.coinChainList?.map(({ chainName, id }) => (
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
                {/* 预售信息填写 */}
                <div>
                  <Button
                    className={`${coinPresaleInfo ? ss.infoFilled : ''}`}
                    onClick={() => setState((state) => ({ ...state, presaleModalVisible: true }))}
                  >
                    {tt.presaleInformation}
                  </Button>
                  {!!coinPresaleInfo && (
                    <Form.Item
                      label={tt.coinPresaleDate}
                      name="coinPresaleDate"
                      validateTrigger="onBlur"
                      rules={[{ required: true }, { pattern: dateReg, message: ' ' }]}
                    >
                      <Input placeholder="YYYY-MM-DD HH:mm" />
                    </Form.Item>
                  )}
                </div>

                {/* 空投信息填写 */}
                <div>
                  <Button
                    className={`${coinAirdropInfo ? ss.infoFilled : ''}`}
                    onClick={() => setState((state) => ({ ...state, airdropModalVisible: true }))}
                  >
                    {tt.airdropInformation}
                  </Button>
                  {!!coinAirdropInfo && (
                    <Form.Item
                      label={tt.coinAirdropDate}
                      name="coinAirdropDate"
                      validateTrigger="onBlur"
                      rules={[{ required: true }, { pattern: dateReg, message: ' ' }]}
                    >
                      <Input placeholder="YYYY-MM-DD HH:mm" />
                    </Form.Item>
                  )}
                </div>
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
            <Form.Item label={tt.contactEmail} name="contactEmail" validateTrigger="onBlur" rules={[{ type: 'email' }]}>
              <Input placeholder="xxxxx@gmail.com" />
            </Form.Item>
            <Form.Item label={tt.contactTelegram} name="contactTg" rules={[{ required: true, whitespace: true }]}>
              <Input placeholder="@Your contact telegram account" />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button htmlType="submit" loading={loading} className={ss.submitBtn}>
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
        <Button type="primary" onClick={() => setState((state) => ({ ...state, coinAirdropInfo: state.coinAirdropInfo.trim(), airdropModalVisible: false }))}>{tt.okBtnText}</Button>
      </Modal>
    </section>
  )
}

export default observer(AddCoin)

// 添加代币成功提示
function afterAdd(tt, history, container) {
  Modal.success({
    icon: null,
    width: 520,
    centered: true,
    closable: false,
    autoFocusButton: null,
    okText: tt.sucSerCCap,
    className: ss.sucAddModal,
    okButtonProps: { type: 'default' },
    getContainer: () => container,
    maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
    onOk: () => void setTimeout(() => history.replace('/'), 400),
    content: (
      <div>
        <h2>
          {tt.sucTitle}
          <RocketIcon />
        </h2>
        <img src={Logo} alt="logo" />
        <p>{tt.sucContactCap}</p>
        {/*<p>{tt.sucWarnCap}</p>*/}
        <p>{tt.sucUpdateCap}</p>
        <b>{tt.sucSerCap}</b>
        <p>{tt.sucSerPCap}</p>
        <p>
          {tt.sucSerVlCap}
          <i onClick={() => setTimeout(() => history.replace('/promote'), 250)}>Promote</i>
          {tt.sucSerVrCap}
        </p>
        <div className="contact-add">
          <span>
            <TgIcon />
            <a href={tg} target="_blank" rel="noreferrer">
              @YYDSCoinsPromo
            </a>
          </span>
        </div>
      </div>
    ),
  })
}
