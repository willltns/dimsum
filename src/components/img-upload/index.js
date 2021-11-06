import ss from './index.module.less'

import React from 'react'
import { Modal, notification, Space, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { uploadFile } from '@/assets/xhr'
import { fileDomain } from '@/consts'

export async function handleFileUpload(file) {
  try {
    if (!file) throw new Error('')
    const formData = new FormData()
    formData.append('file', file)

    return await uploadFile(formData)
  } catch (err) {
    notification.error({
      message: '',
      duration: 3,
      placement: 'topLeft',
      description: (
        <Space direction="vertical">
          <div>代币图片上传错误，请重新尝试</div>
          <div>Coin logo upload error, please try again</div>
        </Space>
      ),
    })
    throw new Error('上传图片出错，请重新尝试')
  }
}

const acceptList = ['.png', '.jpg', '.jpeg', '.webp']

const beforeUpload = (file, fileList) => {
  if (fileList.length > 1) {
    notification.warn({
      message: '',
      duration: 3,
      placement: 'topLeft',
      description: (
        <Space direction="vertical">
          <div>仅支持上传一个图片文件</div>
          <div>Please select only one image file</div>
        </Space>
      ),
    })
    return Upload.LIST_IGNORE
  }

  if (!acceptList.some((type) => file.type.includes(type.slice(1)))) {
    notification.warn({
      message: '',
      duration: 3,
      placement: 'topLeft',
      description: (
        <Space direction="vertical">
          <div>不支持的文件类型，仅支持的有 {acceptList.join(' / ')}</div>
          <div>Unacceptable file type, only accept {acceptList.join(' / ')}</div>
        </Space>
      ),
    })
    return Upload.LIST_IGNORE
  }

  if (file.size / 1024 / 1024 > 0.1) {
    notification.warn({
      message: '',
      duration: 3,
      placement: 'topLeft',
      description: (
        <Space direction="vertical">
          <div>请上传大小不超过 0.1 MB 的图片文件</div>
          <div>Image File size should be less than 0.1 MB.</div>
        </Space>
      ),
    })
    return Upload.LIST_IGNORE
  }

  return false
}

function ImgUpload({ value, onChange, iconRef, onClick, ...restProps }) {
  return (
    <Upload
      name="logo"
      maxCount={1}
      listType="picture-card"
      accept={acceptList.join(',')}
      beforeUpload={beforeUpload}
      className={ss.imgUpload}
      onPreview={onPreview}
      onChange={onChange}
      fileList={value}
      {...restProps}
    >
      <i className="size">&lt; 0.1 MB</i>
      <UploadOutlined ref={iconRef} onClick={onClick} />
      <p className="type">{acceptList.join(', ')}</p>
    </Upload>
  )
}

export default ImgUpload

function onPreview({ response, thumbUrl }) {
  Modal.info({
    icon: null,
    closable: true,
    maskClosable: true,
    className: ss.previewImg,
    content: <img src={response ? fileDomain + response : thumbUrl} alt="logo" />,
  })
}
