"use client";

import { useState } from "react";

export function SignUpButton() {
  const [requested, setRequested] = useState(false);
  return (
    <>
      <button type="button" className="sign-up" aria-describedby="sign-up-status" onClick={() => setRequested(true)}>Sign Up</button>
      <p id="sign-up-status" className="sign-up-status" role="status">
        {requested ? "Demo only: sign-up isn't connected, so nothing is sent." : ""}
      </p>
    </>
  );
}
