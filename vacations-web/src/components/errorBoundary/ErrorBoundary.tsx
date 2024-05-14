import { Link, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div>
            <h1>Something went wrong</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <Link to='/'>Return home</Link>
        </div>
    );
};

export default ErrorBoundary;
