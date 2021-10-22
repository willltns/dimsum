import ss from './index.module.less'

import React from 'react'

function CDButton(props) {
  const { children, className, primary, disabled, ...restProps } = props

  let classes = ss.btn
  if (className) classes = `${classes} ${className}`
  if (primary) classes = `${classes} ${ss.primary}`
  if (disabled) classes = `${classes} ${ss.disabled}`

  return (
    <div className={classes} {...restProps}>
      {children}
    </div>
  )
}

export default CDButton
