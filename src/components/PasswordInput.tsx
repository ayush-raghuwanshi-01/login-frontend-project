import { useState } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 10V7.5C8 5.57 9.57 4 11.5 4h1C14.43 4 16 5.57 16 7.5V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PasswordInput({
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="field">
      <label className="field__label" htmlFor="password">
        Password
      </label>

      <div className={`input-shell ${error ? "is-error" : ""}`}>
        <span className="input-icon" aria-hidden="true">
          <LockIcon />
        </span>

        <input
          id="password"
          name="password"
          type={isVisible ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Enter your password"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "password-error" : undefined}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setIsVisible((current) => !current)}
          disabled={disabled}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>

      {error && (
        <p className="field__error" id="password-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}