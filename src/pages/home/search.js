import ss from './index.module.less'

import React from 'react'
import axios from 'axios'
import { Button, Input } from 'antd'
import { observer } from 'mobx-react'
import { SearchOutlined } from '@ant-design/icons'

import { getCoinTypeList } from './consts'
import { sourceRef } from '@/assets/xhr'
import { useStore } from '@/utils/hooks/useStore'
import zh from './lang/zh.json'
import en from './lang/en.json'

const lang = { zh, en }

function Search() {
  const { home, common } = useStore()
  const language = lang[common.language]

  const searchInputRef = React.useRef(null)

  const handleInputSearch = () => {
    const trimmedValue = home.value?.trim() || ''
    if (!!trimmedValue && home.searchedInputValue === trimmedValue) return // 已搜索
    if (!trimmedValue && !common.searchPromo) return // 空
    if (!trimmedValue && !!common.searchPromo && common.searchPromo === home.searchedInputValue) return // 已搜索
    home.updateProp({
      searchedInputValue: trimmedValue || common.searchPromo,
      loadingAdd: window.innerHeight - searchInputRef.current?.input.getBoundingClientRect().top - 300,
    })
    if (sourceRef.current) sourceRef.current.cancel()
    sourceRef.current = axios.CancelToken.source()
    home.getCoins({ value: trimmedValue || common.searchPromo, type: undefined, pageNo: 1 })
  }

  return (
    <div className={`${ss.searchBar} ${common.isZH ? '' : ss.en}`}>
      <div className={ss.type}>
        <div>
          {getCoinTypeList(language)
            .slice(0, 2)
            .map((item) => (
              <Button
                key={item.value}
                type={home.type === item.value ? 'primary' : ''}
                onClick={(e) => {
                  if (home.type === item.value) return
                  // prettier-ignore
                  home.updateProp({ loadingAdd: window.innerHeight - e.target.getBoundingClientRect().top - 300, })
                  if (sourceRef.current) sourceRef.current.cancel()
                  sourceRef.current = axios.CancelToken.source()
                  home.getCoins({ value: '', type: item.value, pageNo: 1 })
                  home.updateProp({ searchedInputValue: '', value: '' })
                }}
              >
                {item.text}
              </Button>
            ))}
        </div>
        <div>
          {getCoinTypeList(language)
            .slice(2)
            .map((item) => (
              <Button
                key={item.value}
                type={home.type === item.value ? 'primary' : ''}
                onClick={(e) => {
                  if (home.type === item.value) return
                  // prettier-ignore
                  home.updateProp({ loadingAdd: window.innerHeight - e.target.getBoundingClientRect().top - 300, })
                  if (sourceRef.current) sourceRef.current.cancel()
                  sourceRef.current = axios.CancelToken.source()
                  home.getCoins({ value: '', type: item.value, pageNo: 1 })
                  home.updateProp({ searchedInputValue: '', value: '' })
                }}
              >
                {item.text}
              </Button>
            ))}
        </div>
      </div>
      <Input.Search
        size="large"
        autoComplete="off"
        spellCheck={false}
        value={home.value}
        ref={searchInputRef}
        onSearch={handleInputSearch}
        placeholder={common.searchPromo || language.s6}
        prefix={<SearchOutlined onClick={handleInputSearch} />}
        onChange={(e) => home.updateProp({ value: e.target.value })}
      />
    </div>
  )
}

export default React.memo(observer(Search))
