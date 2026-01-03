import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {

    const error = useRouteError();
    console.error(error);
  return (
    <div>
      
    </div>
  )
}

export default ErrorPage
