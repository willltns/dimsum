import ss from './index.module.less'

import React from 'react'
import axios from 'axios'
import { Button, Input } from 'antd'
import { observer } from 'mobx-react'
import { SearchOutlined } from '@ant-design/icons'

import { getCoinTypeList } from './consts'
import { newSourceRef, sourceRef } from '@/assets/xhr'
import { useStore } from '@/utils/hooks/useStore'
import zh from './lang/zh.json'
import en from './lang/en.json'

const lang = { zh, en }

function Search(props) {
  const { allCoins, activeType } = props
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

  const handleTabClick = (e, item) => {
    if (activeType === item.value) return

    if (!allCoins) {
      if (newSourceRef.current) newSourceRef.current.cancel()
      newSourceRef.current = axios.CancelToken.source()
      home.getNewCoins(item.value)
      return
    }

    // prettier-ignore
    home.updateProp({ loadingAdd: window.innerHeight - e.target.getBoundingClientRect().top - 300, })
    if (sourceRef.current) sourceRef.current.cancel()
    sourceRef.current = axios.CancelToken.source()
    home.getCoins({ value: '', type: item.value, pageNo: 1 })
    home.updateProp({ searchedInputValue: '', value: '' })
  }

  const btnLoading = (type) => (allCoins ? undefined : activeType === type && home.newCoinsLoading)

  return (
    <div className={`${ss.searchBar} ${common.isZH ? '' : ss.en}`}>
      <div className={ss.type}>
        {getCoinTypeList(language)
          .slice(...(allCoins ? [0, 2] : [2]))
          .map((item) => (
            <Button
              key={item.value}
              loading={btnLoading(item.value)}
              type={activeType === item.value ? 'primary' : ''}
              onClick={(e) => handleTabClick(e, item)}
            >
              {item.text}
            </Button>
          ))}
      </div>

      {allCoins && (
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
      )}
    </div>
  )
}

export default React.memo(observer(Search))
