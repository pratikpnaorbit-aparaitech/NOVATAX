import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import { loginAdmin } from './leadsStorage';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = loginAdmin(email, password);
      if (res.success) {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setError(res.message || 'Invalid email or password.');
      }
      setLoading(false);
    }, 350);
  };

  return (
    <div className="adminLoginWrapper">
      <div className="adminLoginContainer">
        <Link to="/" className="loginBackLink">
          <ArrowLeft size={16} /> Back to NOVATAX Home
        </Link>

        <div className="adminLoginCard">
          <div className="loginHeader">
            <div className="loginIconCircle">
              <Lock size={26} />
            </div>
            <h2>NOVATAX & Business Consultancy</h2>
            <p>Admin Portal • Access restricted to authorized administrators.</p>
          </div>

          {error && (
            <div className="loginErrorAlert">
              <AlertCircle size={18} className="errorIcon" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="adminLoginForm">
            <div className="formGroup">
              <label htmlFor="adminEmail">Administrator Email</label>
              <div className="inputWithIcon">
                <Mail size={18} className="fieldIcon" />
                <input
                  id="adminEmail"
                  type="email"
                  placeholder="info@ai.aparaitech.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="adminPassword">Password</label>
              <div className="inputWithIcon">
                <Lock size={18} className="fieldIcon" />
                <input
                  id="adminPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="passwordToggleBtn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn green fullWidth loginSubmitBtn" disabled={loading}>
              <ShieldCheck size={18} />
              <span>{loading ? 'Authenticating...' : 'Sign In to Leads Portal'}</span>
            </button>
          </form>

          <div className="loginFooterNote">
            <small>
              Protected system • Customer enquiries & Excel data are confidential.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
