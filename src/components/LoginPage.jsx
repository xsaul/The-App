import {useState} from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const LoginPage = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  return (
    <div className="d-flex vh-90 overflow-hidden" style={{ width: "90vw" }}>
      <div className="d-flex align-items-center justify-content-center" style={{ width: "730px", height: "100vh", display: "flex", flexDirection: "column" }}>
        <div className="card p-4" style={{ maxWidth: "500px", width: "100%" }}>
          <h1 className="text-primary text-center">THE APP</h1>
          <h2 className="text-center fs-6">Start your journey</h2> 
          <h3 className="text-center fw-bold mb-3">
            {isSigningUp ? "Create an Account" : "Sign In to The App"}
          </h3>
          {isSigningUp ? <SignUpForm /> : <SignInForm />}
          <div className="mt-1 text-center">
            <button className="btn btn-link" onClick={() => setIsSigningUp(!isSigningUp)}>
              {isSigningUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
      <div 
  className="flex-grow-1 d-flex align-items-center justify-content-center position-absolute"
  style={{
    backgroundImage: `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='34.129' height='45' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='%23ffffffff'/><path d='M2.51 1.597A23.682 23.682 0 000 1.72v32.65c2.18-2 4.176-4.072 5.844-5.915 3.188-3.523 9.14-2.133 10.242 2.488a5.048 5.048 0 01-.467 3.649c-1.5 2.829-3.843 2.848-5.616 2.316-1.343-.403-2.579.882-2.085 2.193.878 2.334 3.46 4.9 10.724 4.18 5.05-.5 10.712-4.53 15.487-8.911V1.72c-7.355.728-16.01 8.948-21.33 14.827-3.188 3.522-9.14 2.133-10.242-2.489a5.05 5.05 0 01.466-3.648C4.525 7.58 6.867 7.56 8.64 8.092c1.342.403 2.578-.88 2.085-2.192-.77-2.042-2.842-4.262-8.214-4.303z'  stroke-width='1' stroke='none' fill='%234bacecff'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "45%",
    top: 0,
    right: 0,   
  }}></div>
    </div>
  );
};

export default LoginPage;