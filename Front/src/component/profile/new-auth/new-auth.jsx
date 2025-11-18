import React, { useEffect, useState } from "react";
import "./new-auth.css";

function NewAuth({ onLogin, onRegister }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30);

  const handleContinue = async (e) => {
    e.preventDefault();
    if (step === "email" && email) {
      try {
        const res = await fetch("http://localhost:4000/auth/send-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setStep("code");
          setTimer(30);
        } else {
          alert("Error sending code");
        }
      } catch (err) {
        console.error(err);
      }
    } else if (step === "code" && code) {
      try {
        const res = await fetch("http://localhost:4000/auth/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          alert("Login successful!");
          onLogin?.(data);
        } else {
          alert(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    let interval;
    if (step === "code" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleResend = async () => {
    await fetch("http://localhost:4000/auth/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "include",
    });
    setTimer(30);
  };

  return (
    <div className="new-auth">
      <div className="title">
        <div className="flex flex-col items-start">
          <h1>Think it. Make it.</h1>
          <h2>Log in to your Notion account</h2>
        </div>
      </div>
      <div className="login-section">
        <div className="login-btn-list">
          <div className="login-btn">
            <div>
              <img src="/img/google-logo.svg" alt="" />
            </div>
            <div>Continue with Google</div>
            <div></div>
          </div>
          <div className="login-btn">
            <div>
              <svg aria-hidden="true" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51M119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25 25 0 0 1-.188-3.07c0-7.778 3.386-16.102 9.399-22.908q4.504-5.168 11.45-8.597c4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z" />
              </svg>
            </div>
            <div>Continue with Apple</div>
            <div></div>
          </div>
          <div className="login-btn">
            <div>
              <svg aria-hidden="true" viewBox="0 0 18 18">
                <path d="M7 7.656a2.9 2.9 0 0 1-1.602-.468A3.5 3.5 0 0 1 4.234 5.93a3.6 3.6 0 0 1-.43-1.766 3.49 3.49 0 0 1 1.602-2.976A2.9 2.9 0 0 1 7 .726a2.93 2.93 0 0 1 1.602.46 3.36 3.36 0 0 1 1.164 1.235q.437.78.437 1.726a3.64 3.64 0 0 1-.437 1.782 3.4 3.4 0 0 1-1.157 1.258A2.9 2.9 0 0 1 7 7.655zm-5.125 7.328q-.71 0-1.117-.328-.406-.328-.406-.898 0-.75.468-1.57.47-.829 1.336-1.547.876-.72 2.102-1.164Q5.485 9.023 7 9.023q1.008 0 1.883.211a7.3 7.3 0 0 1 1.61.563 4.1 4.1 0 0 0 .39 1.797 3.8 3.8 0 0 0 1.172 1.414v1.976zm12.54-7.789q.741 0 1.343.36.609.36.96.96.36.602.36 1.337 0 .796-.453 1.445-.446.64-1.266 1.039l.844.836a.44.44 0 0 1 .117.297.36.36 0 0 1-.11.265l-.905.899.617.625a.4.4 0 0 1 .117.265.36.36 0 0 1-.117.282l-1.235 1.226a.32.32 0 0 1-.25.102.33.33 0 0 1-.234-.086l-.71-.672a.5.5 0 0 1-.165-.375v-3.703a2.6 2.6 0 0 1-1.148-.977 2.62 2.62 0 0 1-.43-1.468q0-.735.352-1.336.36-.602.96-.961a2.6 2.6 0 0 1 1.352-.36zm0 1.188a.77.77 0 0 0-.563.234.77.77 0 0 0-.227.555q0 .32.234.555a.76.76 0 0 0 .555.234.73.73 0 0 0 .547-.234.76.76 0 0 0 .234-.555.76.76 0 0 0-.234-.555.73.73 0 0 0-.547-.234z" />
              </svg>
            </div>
            <div>Log in with passkey</div>
            <div></div>
          </div>
        </div>
        <div className="seperator"></div>
        <form onSubmit={handleContinue} className="space-y-4 max-w-sm mx-auto">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={step === "code"}
          />
          {step === "code" && (
            <>
              <label>Verification code</label>
              <input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <div className="desc">We sent a code to your inbox</div>
            </>
          )}

          <button type="submit">Continue</button>

          {step === "code" && (
            <>
              {timer > 0 ? (
                <button type="button" className="resend-btn" disabled>
                  Resend in {timer}s
                </button>
              ) : (
                <button
                  type="button"
                  className="resend-btn"
                  onClick={handleResend}
                >
                  Resend verification code
                </button>
              )}
            </>
          )}
        </form>
        <p>
          By continuing, you acknowledge that you understand and agree to the{" "}
          <a href="#">Terms &amp; Conditions </a>
          and <a href="#">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

export default NewAuth;
