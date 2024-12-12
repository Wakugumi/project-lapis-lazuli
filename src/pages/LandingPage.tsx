import React from "react";



export function LandingPage(): React.ReactElement {

  return (
    <>
      <div className="d-flex flex-column align-items-center 
        justify-content-center vh-100 p-5 gap-5">

        <div className="d-flex align-items-end justify-content-start flex-grow-1">
          <h1 className="display-1 text-center mb-4" style={{ fontSize: "6rem" }}>Vivaldi</h1>
        </div>


        <div className="d-flex flex-column flex-grow-1 gap-4">


          <h4 className="fs-4 mb-2">Sign in to your organization account.</h4>
          <a role="button" href="login" class="btn btn-outline-secondary py-2">Authorize</a>

        </div>
      </div>
    </>
  )
}
