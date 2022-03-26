import ss from './index.module.less'

import React from 'react'
import { Input, AutoComplete } from 'antd'
import { observer } from 'mobx-react'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'

import { bscOpt, commonOpt } from './linkOptions'
import { urlReg } from '@/consts'
import { useStore } from '@/utils/hooks/useStore'

const genLink = () => ({ name: '', url: '', key: Math.random() })

const ExtraLinkAdd = (props) => {
  const { value, onChange } = props
  const { common } = useStore()

  const [links, setLinks] = React.useState([{ ...genLink() }])

  React.useEffect(() => {
    if (!value) return
    const links = value
      ?.split('\n')
      .map((s) => {
        if (!s?.trim()) return undefined
        const [name, url] = s.split('$$$')
        return { name, url, key: Math.random() }
      })
      .filter(Boolean)

    setLinks(links)
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    let value = ''
    links.forEach((item) => item.name?.trim() && urlReg.test(item.url) && (value += `${item.name}$$$${item.url}\n`))
    onChange(value)
    // eslint-disable-next-line
  }, [links])

  return (
    <>
      {links.map((item, index) => (
        <Input.Group className={ss.iptGrp} key={item.key}>
          <AutoComplete
            value={item.name}
            spellCheck={false}
            placeholder={common.isZH ? '选择或输入链接标题' : 'Select or input link title'}
            options={[...bscOpt, ...commonOpt]}
            style={{ width: 180, flex: 'none' }}
            getPopupContainer={(tri) => tri.parentNode}
            onChange={(value) => {
              if (value === ' ') return
              const newLink = { ...links[index], name: value || '' }
              const newLinks = [...links]
              newLinks.splice(index, 1, newLink)
              setLinks(newLinks)
            }}
            filterOption={(inputValue, option) => option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1}
            onFocus={(e) => e.target.parentNode?.parentNode?.classList.remove(ss.warn)}
            onBlur={(e) => !e.target.value && e.target.parentNode?.parentNode?.classList.add(ss.warn)}
          />
          &nbsp;:&nbsp;
          <Input
            value={item.url}
            placeholder="https://..."
            bordered={false}
            onChange={(e) => {
              const newLink = { ...links[index], url: e.target?.value?.trim() || '' }
              const newLinks = [...links]
              newLinks.splice(index, 1, newLink)
              setLinks(newLinks)
            }}
            onFocus={(e) => e.target.classList.remove(ss.warn)}
            onBlur={(e) => !urlReg.test(e.target.value) && e.target.classList.add(ss.warn)}
          />
          <MinusCircleOutlined
            className={ss.delBtn}
            onClick={() => {
              const newLinks = [...links]
              newLinks.splice(index, 1)
              setLinks(newLinks)
            }}
          />
        </Input.Group>
      ))}

      <PlusCircleOutlined className={ss.plusBtn} onClick={() => setLinks([...links, { ...genLink() }])} />
    </>
  )
}

export default observer(ExtraLinkAdd)
