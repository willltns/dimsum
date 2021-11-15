import ss from './index.module.less'

import React from 'react'
import { Modal } from 'antd'

import PromoVote from '@/components/promo-vote'

function PromoVoteModal() {
  const { search } = window.location

  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (search?.includes('survey=')) setVisible(true)
    // eslint-disable-next-line
  }, [])

  return (
    <Modal
      width={555}
      footer={null}
      zIndex={1011}
      destroyOnClose
      visible={visible}
      maskClosable={false}
      className={ss.surveyMod}
      onCancel={() => setVisible(false)}
    >
      <PromoVote />
    </Modal>
  )
}

export default PromoVoteModal
