import ss from './index.module.less'

import React from 'react'
import { Modal, notification, Space, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { uploadFile } from '@/assets/xhr'
import { fileDomain } from '@/consts'

export async function handleFileUpload({ file, onError, onSuccess }) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await uploadFile(formData)
    onSuccess(res, file)
  } catch (err) {
    onError('上传出错，请重新尝试')
  }
}

const acceptList = ['.png', '.jpg', '.jpeg', '.webp']

const onPreview = ({ response }) =>
  Modal.info({
    icon: null,
    closable: true,
    maskClosable: true,
    className: ss.previewImg,
    content: <img src={fileDomain + response} alt="logo" />,
  })

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

  return true
}

function ImgUpload({ value, onChange, iconRef, onClick, ...restProps }) {
  return (
    <Upload
      name="logo"
      maxCount={1}
      listType="picture-card"
      accept={acceptList.join(',')}
      customRequest={handleFileUpload}
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

//
export const uploadErrorValidator = {
  validator: (rule, value) =>
    value?.[0]?.status === undefined || value?.[0]?.status === 'done' || value?.[0]?.status === 'uploading'
      ? Promise.resolve()
      : Promise.reject('Upload error, please delete or re-upload.'),
}
