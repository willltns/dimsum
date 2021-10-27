import ss from './index.module.less'

function Spinner() {
  return (
    <div className={ss.wrapper}>
      <div className={ss.circle} />
      <div className={ss.circle} />
      <div className={ss.circle} />
      <div className={ss.shadow} />
      <div className={ss.shadow} />
      <div className={ss.shadow} />
    </div>
  )
}

export default Spinner
