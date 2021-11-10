import { useState, useEffect } from "react";
import { isAlphanumeric } from "validator";
function UsernameHooks() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const [onFocus, setOnFocus] = useState(false);

  const [onBlur, setOnBlur] = useState(false);

  useEffect(() => {
    if (onFocus) {
      if (username.length > 0) {
        if (!isAlphanumeric(username)) {
          setError("username cannot have special character");
        }

        if (isAlphanumeric(username)) {
          setError("");
        }
      }
    }

    if (onBlur) {
      if (username.length === 0) {
        setError("username cannot be empty");
      }
    }
  }, [username, onFocus, onBlur]);

  function handleUsernameOnChange(e) {
    setUsername(e.target.value);
  }

  return [username, handleUsernameOnChange, error, setOnFocus, setOnBlur];
}

export default UsernameHooks;
