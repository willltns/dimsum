import ss from './index.module.less'

import React from 'react'
import qs from 'qs'
import ClipboardJS from 'clipboard'
import { CopyOutlined } from '@ant-design/icons'
import { AutoComplete, Button, Form, Input, Modal, notification, Radio, Space } from 'antd'

function ReferralForm() {
  const [values, setV] = React.useState({
    contactName: '',
    contactTg: '',
    coin: '',
    services: ['', '', '', ''],
    source: '',
    otherSource: '',
    referrer: '',
    errorField: '',
    modalVisible: false,
    refRes: null,
    loading: false,
    reValidate: 1,
  })

  const {
    contactName,
    contactTg,
    coin,
    services,
    source,
    otherSource,
    referrer,
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
    setValues({ referrer: query?.referralCode?.toUpperCase() || '' })
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
      notification.success({ message: 'xx', description: 'fxx', duration: 2.5 })
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

  const handleSubmit = () => {
    setValues({ reValidate: reValidate + 1 })
    if (!contactName.trim()) return setValues({ errorField: 'name-error' })
    if (!contactTg.trim()) return setValues({ errorField: 'tg-error' })
    if (!coin) return setValues({ errorField: 'coin-error' })
    if (services?.every((s) => !s)) return setValues({ errorField: 'ser-error' })
    if (!source.trim()) return setValues({ errorField: 'source-error' })
    setValues({ errorField: '', loading: true })

    // xhr after success

    setValues({
      contactName: '',
      contactTg: '',
      coin: '',
      services: ['', '', '', ''],
      source: '',
      otherSource: '',
      loading: false,
    })
    Modal.success({
      icon: null,
      width: 520,
      centered: true,
      closable: false,
      autoFocusButton: null,
      content: 'aaa',
    })
  }

  return (
    <>
      <h2 style={{ padding: '0 calc((100% - 1016px) / 2)', fontWeight: 'bold', fontSize: 28 }}>
        Promotion Request Form
      </h2>
      <div className={ss.referralForm} ref={referralFormRef}>
        <p>
          <span>
            Start your journey as a <b>advert-partner</b> and reach thousands of Chinese investors overnight.
          </span>{' '}
          Help us to give you a more personalized experience by filling in this. Takes only 1 minute!
        </p>

        <div>
          <label {...(errorField === 'name-error' ? { className: ss.error } : {})}>1. Name:</label>
          <Input
            bordered={false}
            spellCheck={false}
            value={contactName}
            onChange={(e) => setValues({ contactName: e.target.value })}
          />
        </div>

        <div>
          <label {...(errorField === 'tg-error' ? { className: ss.error } : {})}>2. Telegram contact:</label>
          <Input
            bordered={false}
            spellCheck={false}
            value={contactTg}
            onChange={(e) => setValues({ contactTg: e.target.value })}
          />
        </div>

        <div>
          <label {...(errorField === 'coin-error' ? { className: ss.error } : {})}>3. Coin for Promotion:</label>
          <AutoComplete
            size="small"
            value={coin}
            bordered={false}
            className={ss.acpl}
            onChange={(coin) => setValues({ coin })}
            getPopupContainer={(tri) => tri.parentNode}
          />
        </div>

        <div className={ss.services}>
          <label {...(errorField === 'ser-error' ? { className: ss.error } : {})}>
            4. Promotion services of Interest (You may check at least 1):
          </label>
          <ul>
            <li>
              <span>Promoted coins section: </span>
              <Radio.Group value={services[0]} onChange={(e) => handleServicesChange(e.target.value, 0)}>
                <Radio value={'Promoted coins section - 1 day'} onClick={(e) => handleRadioClick(e.target.checked, 0)}>
                  1 day
                </Radio>
                <Radio value={'Promoted coins section - 3 day'} onClick={(e) => handleRadioClick(e.target.checked, 0)}>
                  3 day
                </Radio>
                <Radio value={'Promoted coins section - 1 week'} onClick={(e) => handleRadioClick(e.target.checked, 0)}>
                  1 week
                </Radio>
              </Radio.Group>
            </li>
            <li>
              <span>Wide header banner: </span>
              <Radio.Group value={services[1]} onChange={(e) => handleServicesChange(e.target.value, 1)}>
                <Radio value={'Wide header banner - 1 day'} onClick={(e) => handleRadioClick(e.target.checked, 1)}>
                  1 day
                </Radio>
                <Radio value={'Wide header banner - 3 day'} onClick={(e) => handleRadioClick(e.target.checked, 1)}>
                  3 day
                </Radio>
                <Radio value={'Wide header banner - 1 week'} onClick={(e) => handleRadioClick(e.target.checked, 1)}>
                  1 week
                </Radio>
              </Radio.Group>
            </li>
            <li>
              <span>Rotating banner: </span>
              <Radio.Group value={services[2]} onChange={(e) => handleServicesChange(e.target.value, 2)}>
                <Radio value={'Rotating banner - 1 day'} onClick={(e) => handleRadioClick(e.target.checked, 2)}>
                  1 day
                </Radio>
                <Radio value={'Rotating banner - 3 day'} onClick={(e) => handleRadioClick(e.target.checked, 2)}>
                  3 day
                </Radio>
                <Radio value={'Rotating banner - 1 week'} onClick={(e) => handleRadioClick(e.target.checked, 2)}>
                  1 week
                </Radio>
              </Radio.Group>
            </li>
            <li>
              <span>Pop-up on all pages: </span>
              <Radio.Group value={services[3]} onChange={(e) => handleServicesChange(e.target.value, 3)}>
                <Radio value={'Pop-up banner - 1 day'} onClick={(e) => handleRadioClick(e.target.checked, 3)}>
                  1 day
                </Radio>
                <Radio value={'Pop-up banner - 3 day'} onClick={(e) => handleRadioClick(e.target.checked, 3)}>
                  3 day
                </Radio>
              </Radio.Group>
            </li>
          </ul>
        </div>

        <div>
          <label {...(errorField === 'source-error' ? { className: ss.error } : {})}>
            5. How did you hear about YYDSCoins?
          </label>
          <Radio.Group
            style={{ display: 'block', marginTop: 4, marginLeft: 16 }}
            value={source}
            onChange={(e) => setValues({ source: e.target.value, otherSource: '' })}
          >
            <Space direction="vertical">
              <Radio value="From a friend/developer">a. From a friend/developer</Radio>
              <Radio value="Google Search">b. Google Search</Radio>
              <Radio value="News website">c. News Website</Radio>
              <Radio value="Chinese Telegram communities">d. Chinese Telegram Communities</Radio>
              <Radio value="English Telegram communities">e. English Telegram Communities</Radio>
              <Radio value="Twitter">f. Twitter</Radio>
              <Radio value="Others">
                <span>g. Others</span>
                <Input
                  size="small"
                  bordered={false}
                  spellCheck={false}
                  value={otherSource}
                  onChange={(e) => setValues({ otherSource: e.target.value })}
                  onClick={(e) => !e.target.parentNode.click() && e.target.focus()}
                  style={{ borderBottom: '1px solid #d9d9d9', borderRadius: 0, marginLeft: 11 }}
                />
              </Radio>
            </Space>
          </Radio.Group>
        </div>

        <div className={ss.referral}>
          <div>
            <label>6. Referral Code (optional):</label>
            <Input
              bordered={false}
              value={referrer}
              spellCheck={false}
              onChange={(e) => setValues({ referrer: e.target.value?.trim()?.toUpperCase() })}
            />
          </div>
          <p>
            *By inputting this field, your referrer gets rewarded accordingly.{' '}
            <span>
              Forgot or don’t have a referral code, <i onClick={() => setValues({ modalVisible: true })}>click here</i>{' '}
              to get your referral code.
            </span>
          </p>
        </div>

        <Button type="primary" onClick={handleSubmit} loading={modalVisible ? false : loading}>
          Submit Promotion Request
        </Button>

        <Modal
          visible={modalVisible}
          title="获取您的推荐码"
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
                setValues({ refRes: { code: 'YYDS-66COINSW' } })
                setValues({ loading: false })
              }}
              validateMessages={{ required: ` `, whitespace: ` ` }}
            >
              <Form.Item label="称呼" name="username" rules={[{ required: true, whitespace: true }]}>
                <Input spellCheck={false} style={{ maxWidth: 400 }} />
              </Form.Item>
              <Form.Item label="联系电报" name="contactTg" rules={[{ required: true, whitespace: true }]}>
                <Input spellCheck={false} style={{ maxWidth: 400 }} />
              </Form.Item>
              <Form.Item label="BSC 钱包地址" name="walletAddr" rules={[{ required: true, whitespace: true }]}>
                <Input placeholder="0x..." spellCheck={false} style={{ maxWidth: 400 }} />
              </Form.Item>

              <Form.Item noStyle>
                <Button htmlType="submit" type="primary" loading={loading}>
                  获取
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <div className={ss.refRes} ref={referralResRef}>
              <div>
                <label>您的推荐码: </label>
                <span>
                  {refRes.code}
                  <CopyOutlined className="copy-btn" data-clipboard-text={refRes.code} />
                </span>
              </div>
              <div>
                <label>您的推荐链接: </label>
                <span>
                  {process.env.REACT_APP_DOMAIN}/promote?referralCode={refRes.code}
                  <CopyOutlined
                    className="copy-btn"
                    data-clipboard-text={`${process.env.REACT_APP_DOMAIN}/promote?referralCode=${refRes.code}`}
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

export default ReferralForm
