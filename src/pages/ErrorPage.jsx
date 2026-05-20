import { NavLink, useRouteError } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error("Route Error:", error);

  return (
    <div className="error-page-container">
      <div className="error-card">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <h1 className="error-title">Oops! Something went wrong.</h1>
        <p className="error-description">
          We couldn't find the page you were looking for, or an unexpected error occurred.
        </p>
        
        {error && (
          <div className="error-details">
            <p><strong>Error Details:</strong> {error.statusText || error.message || error.data}</p>
          </div>
        )}

        <NavLink to="/">
          <button className="btn-darken btn-go-home">
            <FaHome /> Back to Home
          </button>
        </NavLink>
      </div>

      <style>{`
        .error-page-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          padding: 2rem;
        }
        .error-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 2.4rem;
          padding: 5rem 4rem;
          max-width: 60rem;
          text-align: center;
          box-shadow: var(--card-shadow);
        }
        .error-icon {
          font-size: 8rem;
          color: #ef4444;
          margin-bottom: 2.4rem;
          animation: pulseError 2s infinite;
        }
        .error-title {
          font-size: 3.6rem;
          margin-bottom: 1.6rem;
        }
        .error-description {
          font-size: 1.8rem;
          color: var(--text-secondary);
          margin-bottom: 3.2rem;
        }
        .error-details {
          background: var(--bg-tertiary);
          padding: 1.6rem;
          border-radius: 1rem;
          border-left: 4px solid #ef4444;
          margin-bottom: 3.2rem;
          font-family: monospace;
          color: var(--text-secondary);
        }
        .btn-go-home {
          font-size: 1.8rem;
          padding: 1.6rem 3.2rem;
        }
        @keyframes pulseError {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};