import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
      <p>Page not found</p>
      <Link to="/">Home page</Link>
    </div>
  )
}

export default PageNotFound
