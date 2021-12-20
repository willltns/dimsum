import ss from './index.module.less'
import { ReactComponent as TgIcon } from '@/assets/img/link-icon/tg.svg'
import { ReactComponent as RocketIcon } from '@/assets/img/link-icon/rocket.svg'

import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Select, Modal } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'

import zh from './lang/zh.json'
import en from './lang/en.json'
import { tg, urlReg } from '@/consts'
import { addCoin } from '@/assets/xhr'
import { useStore } from '@/utils/hooks/useStore'
import { descPH } from './const'

import Footer from '@/components/footer'
import ExtraLinkAdd from '@/components/extra-link-add'
import ImgUpload, { handleFileUpload } from '@/components/img-upload'

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

  const [state, setState] = useState({ loading: false, presaleDateR: false })
  const { loading, presaleDateR } = state

  const tt = common.isZH ? zh : en

  const [form] = Form.useForm()

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
      const params = { ...values, linkAdditionalInfo: linkAdditionalInfo?.trim() || '' }
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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      await onFinish(values)
    } catch (error) {
      onFinishFailed(error)
    }
  }

  return (
    <section className={ss.addCoin} ref={addSecRef}>
      <div className={ss.head}>
        <Link replace to="/">
          <ArrowLeftOutlined /> {tt.backText}
        </Link>
      </div>

      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        className={ss.form}
        validateMessages={{ required: ` `, whitespace: ` `, pattern: { mismatch: ` ` }, types: { email: ` ` } }}
        onValuesChange={(changedValue, allValues) => {
          // prettier-ignore
          const atLeastOne = ['linkWebsite', 'linkChineseTg', 'linkEnglishTg', 'linkTwitter', 'linkMedium', 'linkDiscord', 'linkAdditionalInfo',]
          if (!atLeastOne.includes(Object.keys(changedValue)[0])) return
          linkTipRef.current.style.opacity = atLeastOne.every((key) => !allValues[key]) ? 1 : 0
        }}
        initialValues={{ coinLaunchDate: '2021-00-00 00:00' }}
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
              <Input
                placeholder="e.g. BTC"
                onChange={(e) => form.setFieldsValue({ coinSymbol: e.target?.value?.trim() || '' })}
              />
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
              <Input.TextArea autoSize={{ minRows: 8 }} placeholder={descPH} allowClear />
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
              <Input
                placeholder="0x000000..."
                onChange={(e) => form.setFieldsValue({ coinAddress: e.target?.value?.trim() || '' })}
              />
            </Form.Item>

            <Form.Item noStyle>
              <h2>{tt.presale_wls}</h2>
            </Form.Item>

            {/* prettier-ignore */}
            <Form.Item label={tt.presaleLink} name="coinPresaleInfo" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input
                placeholder="https://..."
                onBlur={(e) => {
                  const value = e.target?.value?.trim()
                  setState((state) => ({ ...state, presaleDateR: urlReg.test(value) }))
                  if (value === '' || urlReg.test(value)) form.validateFields(['coinPresaleDate'])
                }}
                onChange={(e) => form.setFieldsValue({ coinPresaleInfo: e.target?.value?.trim() || '' })}
              />
            </Form.Item>
            <Form.Item
              label={tt.coinPresaleDate}
              name="coinPresaleDate"
              validateTrigger="onBlur"
              rules={[{ required: presaleDateR }, { pattern: dateReg, message: ' ' }]}
            >
              <Input placeholder="YYYY-MM-DD HH:mm" />
            </Form.Item>

            {/* prettier-ignore */}
            <Form.Item label={tt.wlsLink} name="coinAirdropInfo" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." onChange={(e) => form.setFieldsValue({ coinAirdropInfo: e.target?.value?.trim() || '' })} />
            </Form.Item>
            <Form.Item
              label={tt.coinWlsDate}
              name="coinAirdropDate"
              validateTrigger="onBlur"
              rules={[{ pattern: dateReg, message: ' ' }]}
            >
              <Input placeholder="YYYY-MM-DD HH:mm" />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item noStyle>
              {/* prettier-ignore */}
              <h2>{tt.linkTitle}<span className={ss.linkTip} ref={linkTipRef}>{tt.linkTip}</span></h2>
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.website} name="linkWebsite" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." onChange={(e) => form.setFieldsValue({ linkWebsite: e.target?.value?.trim() || '' })} />
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.chineseTG} name="linkChineseTg" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." onChange={(e) => form.setFieldsValue({ linkChineseTg: e.target?.value?.trim() || '' })} />
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.englishTG} name="linkEnglishTg" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." onChange={(e) => form.setFieldsValue({ linkEnglishTg: e.target?.value?.trim() || '' })} />
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.twitter} name="linkTwitter" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." onChange={(e) => form.setFieldsValue({ linkTwitter: e.target?.value?.trim() || '' })} />
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.medium} name="linkMedium" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." onChange={(e) => form.setFieldsValue({ linkMedium: e.target?.value?.trim() || '' })} />
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.discord} name="linkDiscord" rules={[{ whitespace: true }, { pattern: urlReg }]} validateTrigger="onBlur">
              <Input placeholder="https://..." onChange={(e) => form.setFieldsValue({ linkDiscord: e.target?.value?.trim() || '' })} />
            </Form.Item>
            {/* prettier-ignore */}
            <Form.Item label={tt.addLinkInfo} name="linkAdditionalInfo" >
              <ExtraLinkAdd />
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

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Button loading={loading} className={ss.submitBtn} onClick={handleSubmit}>
            {tt.addCoin}
          </Button>
        </div>
      </Form>

      <Footer />
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
        <img src="/logo.png" alt="logo" />
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
