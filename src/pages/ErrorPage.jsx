import { NavLink, useRouteError } from 'react-router-dom'

const ErrorPage = () => {

    const error = useRouteError();
    console.error(error);
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <NavLink to="/">
        <button>Go Home</button>
      </NavLink>
    </div>
  )
}

export default ErrorPage
