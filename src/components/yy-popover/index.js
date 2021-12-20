import ss from './index.module.less'

import React from 'react'
import { Popover } from 'antd'

const defaultP = { mouseLeaveDelay: 0, destroyTooltipOnHide: { keepParent: false }, overlayClassName: ss.yydsPop }

function YYPopover(props) {
  const { children, ...rest } = props

  return (
    <Popover {...defaultP} {...rest}>
      {children}
    </Popover>
  )
}

export default YYPopover
