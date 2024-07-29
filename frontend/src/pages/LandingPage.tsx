import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="text-center ">
        <h1>Welcome to medium clone, navigate to following links:</h1>
            <div>
                <ol>
                    <li><Link to="/signup">New user? Sign-up Page</Link></li>
                    <li><Link to="/signin">Sign-in Page</Link></li>
                </ol>
            </div>

    </div>
  )
}

export default LandingPage