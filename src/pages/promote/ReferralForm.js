import ss from './index.module.less'
import { ReactComponent as RocketIcon } from '@/assets/img/link-icon/rocket.svg'

import React from 'react'
import qs from 'qs'
import { observer } from 'mobx-react'
import ClipboardJS from 'clipboard'
import { CopyOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, notification, Radio, Space } from 'antd'

import { applyReferrer, applyPromo } from '@/assets/xhr'
import { useStore } from '@/utils/hooks/useStore'
import zh from './lang/zh.json'
import en from './lang/en.json'
import { tg } from '@/consts'

function ReferralForm() {
  const { common } = useStore()
  const language = common.isZH ? zh : en

  const [values, setV] = React.useState({
    username: '',
    contactTg: '',
    coinInfo: '',
    services: ['', '', '', ''],
    source: '',
    otherSource: '',
    referralCode: '',
    errorField: '',
    modalVisible: false,
    refRes: null,
    loading: false,
    reValidate: 1,
  })

  const {
    username,
    contactTg,
    coinInfo,
    services,
    source,
    otherSource,
    referralCode,
    errorField,
    modalVisible,
    refRes,
    loading,
    reValidate,
  } = values

  const setValues = (newV) => setV((state) => ({ ...state, ...newV }))

  React.useEffect(() => {
    const { search } = window.location
    const query = qs.parse(search, { ignoreQueryPrefix: true })
    setValues({ referralCode: query?.referralCode?.toUpperCase() || '' })
  }, [])

  const referralFormRef = React.useRef(null)
  React.useEffect(() => {
    if (!errorField) return
    const errorEle = referralFormRef.current?.getElementsByClassName(ss.error)?.[0]
    if (!errorEle) return
    const topOffset = errorEle.getBoundingClientRect().top
    const addonTop = 66
    if (topOffset >= addonTop) return
    let scrollOffset = topOffset - addonTop
    window.scrollBy({ top: scrollOffset, left: 0 })
  }, [errorField, reValidate])

  const referralResRef = React.useRef(null)
  React.useEffect(() => {
    if (!refRes) return

    const clipboard = new ClipboardJS(referralResRef.current?.querySelectorAll('.copy-btn'))
    clipboard.on('success', () => {
      notification.success({ message: language.prf36, description: '', duration: 1 })
    })

    return () => clipboard.destroy()
  }, [refRes])

  const handleServicesChange = (value, index) => {
    const newS = [...services]
    newS[index] = value
    setValues({ services: newS })
  }
  const handleRadioClick = (checked, index) => {
    if (checked && services[index]) {
      const newS = [...services]
      newS[index] = ''
      setValues({ services: newS })
    }
  }

  const handleSubmit = async () => {
    setValues({ reValidate: reValidate + 1 })
    if (!username.trim()) return setValues({ errorField: 'name-error' })
    if (!contactTg.trim()) return setValues({ errorField: 'tg-error' })
    if (!coinInfo) return setValues({ errorField: 'coin-error' })
    if (services?.every((s) => !s)) return setValues({ errorField: 'ser-error' })
    if (!source) return setValues({ errorField: 'source-error' })
    setValues({ errorField: '', loading: true })

    try {
      const promoService = services.filter((i) => !!i).join('$$$')
      const params = { username, contactTg, coinInfo, promoService, referralCode }
      params.source = source === 'Others' ? source + (otherSource ? `: ${otherSource}` : '') : source

      await applyPromo(params)

      setValues({
        username: '',
        contactTg: '',
        coinInfo: '',
        services: ['', '', '', ''],
        source: '',
        otherSource: '',
        loading: false,
      })

      afterSubmit(language)
    } catch (err) {
      setValues({ loading: false })
    }
  }

  return (
    <>
      <h2 style={{ padding: '0 calc((100% - 1016px) / 2)', fontWeight: 'bold', fontSize: 28, color: '#545454' }}>
        {language.prf}
      </h2>
      <div className={ss.referralForm} ref={referralFormRef}>
        <p>
          <span>
            {language.prf0}
            <b>{language.prf1}</b>
            {language.prf2}
          </span>{' '}
          {language.prf3}
        </p>

        <div>
          <label {...(errorField === 'name-error' ? { className: ss.error } : {})}>1. {language.prf4}:</label>
          <Input
            bordered={false}
            spellCheck={false}
            value={username}
            onChange={(e) => setValues({ username: e.target.value })}
          />
        </div>

        <div>
          <label {...(errorField === 'tg-error' ? { className: ss.error } : {})}>2. {language.prf5}:</label>
          <Input
            bordered={false}
            spellCheck={false}
            value={contactTg}
            onChange={(e) => setValues({ contactTg: e.target.value })}
          />
        </div>

        <div>
          <label {...(errorField === 'coin-error' ? { className: ss.error } : {})}>3. {language.prf6}:</label>
          <Input
            bordered={false}
            spellCheck={false}
            value={coinInfo}
            onChange={(e) => setValues({ coinInfo: e.target.value })}
          />
        </div>

        <div className={ss.services}>
          <label {...(errorField === 'ser-error' ? { className: ss.error } : {})}>4. {language.prf7}:</label>
          <ul>
            <li>
              <span>{language.prf8}: </span>
              <Radio.Group value={services[0]} onChange={(e) => handleServicesChange(e.target.value, 0)}>
                <Radio value={'Promoted coins section - 1 day'} onClick={(e) => handleRadioClick(e.target.checked, 0)}>
                  1 {language.prf12}
                </Radio>
                <Radio value={'Promoted coins section - 3 day'} onClick={(e) => handleRadioClick(e.target.checked, 0)}>
                  3 {language.prf13}
                </Radio>
                <Radio value={'Promoted coins section - 1 week'} onClick={(e) => handleRadioClick(e.target.checked, 0)}>
                  1 {language.prf14}
                </Radio>
              </Radio.Group>
            </li>
            <li>
              <span>{language.prf9}: </span>
              <Radio.Group value={services[1]} onChange={(e) => handleServicesChange(e.target.value, 1)}>
                <Radio value={'Wide header banner - 1 day'} onClick={(e) => handleRadioClick(e.target.checked, 1)}>
                  1 {language.prf12}
                </Radio>
                <Radio value={'Wide header banner - 3 day'} onClick={(e) => handleRadioClick(e.target.checked, 1)}>
                  3 {language.prf13}
                </Radio>
                <Radio value={'Wide header banner - 1 week'} onClick={(e) => handleRadioClick(e.target.checked, 1)}>
                  1 {language.prf14}
                </Radio>
              </Radio.Group>
            </li>
            <li>
              <span>{language.prf10}: </span>
              <Radio.Group value={services[2]} onChange={(e) => handleServicesChange(e.target.value, 2)}>
                <Radio value={'Rotating banner - 1 day'} onClick={(e) => handleRadioClick(e.target.checked, 2)}>
                  1 {language.prf12}
                </Radio>
                <Radio value={'Rotating banner - 3 day'} onClick={(e) => handleRadioClick(e.target.checked, 2)}>
                  3 {language.prf13}
                </Radio>
                <Radio value={'Rotating banner - 1 week'} onClick={(e) => handleRadioClick(e.target.checked, 2)}>
                  1 {language.prf14}
                </Radio>
              </Radio.Group>
            </li>
            <li>
              <span>{language.prf11}: </span>
              <Radio.Group value={services[3]} onChange={(e) => handleServicesChange(e.target.value, 3)}>
                <Radio value={'Pop-up banner - 1 day'} onClick={(e) => handleRadioClick(e.target.checked, 3)}>
                  1 {language.prf12}
                </Radio>
                <Radio value={'Pop-up banner - 3 day'} onClick={(e) => handleRadioClick(e.target.checked, 3)}>
                  3 {language.prf13}
                </Radio>
              </Radio.Group>
            </li>
          </ul>
        </div>

        <div>
          <label {...(errorField === 'source-error' ? { className: ss.error } : {})}>5. {language.prf15}</label>
          <Radio.Group
            style={{ display: 'block', marginTop: 4, marginLeft: 16 }}
            value={source}
            onChange={(e) => setValues({ source: e.target.value, otherSource: '' })}
          >
            <Space direction="vertical">
              <Radio value="From a friend/developer">{language.prf16}</Radio>
              <Radio value="Google Search">{language.prf17}</Radio>
              <Radio value="News website">{language.prf18}</Radio>
              <Radio value="Chinese Telegram communities">{language.prf19}</Radio>
              <Radio value="English Telegram communities">{language.prf20}</Radio>
              <Radio value="Twitter">{language.prf21}</Radio>
              <Radio value="Others">
                <span>{language.prf22}</span>
                <Input
                  size="small"
                  bordered={false}
                  spellCheck={false}
                  value={otherSource}
                  onChange={(e) => setValues({ otherSource: e.target.value })}
                  onClick={(e) => !e.target.parentNode.click() && e.target.focus()}
                  style={{ borderBottom: '1px solid #d9d9d9', borderRadius: 0 }}
                />
              </Radio>
            </Space>
          </Radio.Group>
        </div>

        <div className={ss.referral}>
          <div>
            <label>6. {language.prf23}:</label>
            <Input
              bordered={false}
              value={referralCode}
              spellCheck={false}
              placeholder="YYDS-XXXXXXXX"
              onChange={(e) => setValues({ referralCode: e.target.value?.trim()?.toUpperCase() })}
            />
          </div>
          <p>
            {language.prf24} <i onClick={() => setValues({ modalVisible: true })}>{language.prf25}</i> {language.prf26}
          </p>
        </div>

        <Button type="primary" onClick={handleSubmit} loading={modalVisible ? false : loading}>
          {language.prf27}
        </Button>

        <Modal
          visible={modalVisible}
          title={language.prf28}
          destroyOnClose
          footer={null}
          width={626}
          keyboard={!loading}
          maskClosable={!loading}
          onCancel={() => setValues({ modalVisible: false, refRes: null })}
        >
          {!refRes ? (
            <Form
              layout="vertical"
              onFinish={(values) => {
                setValues({ loading: true })
                applyReferrer(values)
                  .then((res) => setValues({ refRes: res, loading: false }))
                  .catch(() => setValues({ loading: false }))
              }}
              validateMessages={{ required: ` `, whitespace: ` ` }}
            >
              <Form.Item label={language.prf29} name="username" rules={[{ required: true, whitespace: true }]}>
                <Input spellCheck={false} style={{ maxWidth: 400 }} />
              </Form.Item>
              <Form.Item label={language.prf30} name="contactTg" rules={[{ required: true, whitespace: true }]}>
                <Input spellCheck={false} style={{ maxWidth: 400 }} />
              </Form.Item>
              <Form.Item
                label={language.prf31}
                name="bscAddress"
                rules={[
                  { required: true, whitespace: true },
                  { pattern: /^0x[0-9A-Za-z]{40}$/i, message: language.prf32 },
                ]}
              >
                <Input placeholder="0x..." spellCheck={false} style={{ maxWidth: 400 }} />
              </Form.Item>

              <Form.Item noStyle>
                <Button htmlType="submit" type="primary" loading={loading}>
                  {language.prf33}
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <div className={ss.refRes} ref={referralResRef}>
              <div>
                <label>{language.prf34}: </label>
                <span>
                  {refRes}
                  <CopyOutlined className="copy-btn" data-clipboard-text={refRes} />
                </span>
              </div>
              <div>
                <label>{language.prf35}: </label>
                <span>
                  {process.env.REACT_APP_DOMAIN}/promote?referralCode={refRes}
                  <CopyOutlined
                    className="copy-btn"
                    data-clipboard-text={`${process.env.REACT_APP_DOMAIN}/promote?referralCode=${refRes}`}
                  />
                </span>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  )
}

export default observer(ReferralForm)

// 推广申请提交成功提示
function afterSubmit(language) {
  Modal.success({
    icon: null,
    width: 520,
    centered: true,
    closable: false,
    destroyOnClose: true,
    autoFocusButton: null,
    okText: language.prf41,
    className: ss.sucSubmitModal,
    okButtonProps: { type: 'default' },
    maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
    content: (
      <div>
        <h2>
          {language.prf37}
          <RocketIcon />
        </h2>
        <img src="/logo.png" alt="logo" />
        <p>{language.prf38}</p>
        <p>
          {language.prf39}{' '}
          <a href={tg} target="_blank" rel="noreferrer">
            @YYDSCoinsPromo
          </a>{' '}
          {language.prf40}
        </p>
      </div>
    ),
  })
}
