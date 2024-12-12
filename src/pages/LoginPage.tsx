import React from 'react';
import { useState } from 'react';
import { Login } from '../types/Worker'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';


export function LoginPage(): React.ReactElement {

  const [error, setError] = useState<string | null>(null);
  const [Form, setForm] = useState<Login>({
    email: '',
    password: ''

  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...Form as Login, [name]: value, });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.login(Form)
      .then(() => {
        navigate("/dashboard")
      }).catch(reject => {
        setError(reject?.message);
      })
  }

  return (
    <>
      <div className="container">

        <div className="d-flex flex-column align-items-center justify-content-center vh-100 p-5 gap-5">


          <div className="d-flex align-items-center justify-content-center flex-grow-1">

            <div className="card card-body">

              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger" role="alert">
                  {error}
                </div>}

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input className="form-control" name="email" id="username" value={Form?.email} aria-describedby="emailHelp" onChange={handleForm} />
                  <div id="emailHelp" className="form-text">Use email address as username.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" id="password" value={Form?.password} onChange={handleForm} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
              </form>

            </div>

          </div>



        </div >

      </div >
    </>
  )
}
