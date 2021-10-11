import ss from './index.module.less'

import { Input, Modal } from 'antd'

export const modalInfo = ({ okText = '好的', ...props }) =>
  Modal.info({
    okText,
    ...props,
    centered: true,
    keyboard: true,
    maskClosable: true,
    autoFocusButton: null,
    className: ss.infoModal,
    content: (
      <div>
        <Input.TextArea value={props.text} readOnly autoSize />
      </div>
    ),
  })
