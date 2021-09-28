import { useHistory } from 'react-router-dom'

function About() {
  const history = useHistory()

  const toCounter = () => {
    history.push('/counter')
  }

  return (
    <div>
      <h1>About Page</h1>
      <button onClick={toCounter}>to counter</button>
    </div>
  )
}

export default About
