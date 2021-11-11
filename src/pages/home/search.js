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
                  home.updateProp({ searchedInputValue: '', value: common.searchPromo || '' })
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
                  home.updateProp({ searchedInputValue: '', value: common.searchPromo || '' })
                }}
              >
                {item.text}
              </Button>
            ))}
        </div>
      </div>
      <Input.Search
        autoComplete="off"
        spellCheck={false}
        value={home.value}
        ref={searchInputRef}
        prefix={<SearchOutlined />}
        className={`${home.value && home.value === common.searchPromo ? ss.promoVal : ''} ${
          home.searchedInputValue === common.searchPromo ? ss.promoSearched : ''
        }`}
        placeholder={language.s6}
        onBlur={() =>
          home.value?.trim() && home.searchedInputValue ? null : home.updateProp({ value: common.searchPromo || '' })
        }
        onChange={(e) => home.updateProp({ value: e.target.value })}
        onSearch={() => {
          if (home.searchedInputValue === home.value) return
          home.updateProp({
            searchedInputValue: home.value?.trim() || '',
            loadingAdd: window.innerHeight - searchInputRef.current?.input.getBoundingClientRect().top - 300,
          })
          if (sourceRef.current) sourceRef.current.cancel()
          sourceRef.current = axios.CancelToken.source()
          home.getCoins({ value: home.value?.trim() || '', type: undefined, pageNo: 1 })
        }}
      />
    </div>
  )
}

export default React.memo(observer(Search))
