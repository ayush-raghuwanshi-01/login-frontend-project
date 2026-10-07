import { useState } from "react";
import type { FormEvent } from "react";

import { BrandLogo } from "../../components/BrandLogo";
import { Captcha } from "../../components/Captcha";
import { PasswordInput } from "../../components/PasswordInput";

import { ApiError, loginUser } from "../../services/authService";

import type {
  FieldErrors,
  LoginFormValues,
} from "../../types/auth";

import {
  hasErrors,
  validateLogin,
} from "../../utils/validation";

import { useCaptcha } from "../../hooks/useCaptcha";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  captchaAnswer: "",
};

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.52A9.75 9.75 0 0 0 12 21.5Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.61A5.86 5.86 0 0 1 6.23 12c0-.56.11-1.1.31-1.61V7.87H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.13l3.25-2.52Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.36c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.49 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.71 5.37l3.25 2.52C7.31 8.08 9.46 6.36 12 6.36Z"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M12 7.5v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="16"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

function TeamNetworkIllustration() {
  return (
    <div
      className="team-network"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 520 380"
        fill="none"
      >
        {/* Connections */}
        <g className="network-lines">
          <line x1="260" y1="190" x2="115" y2="92" />
          <line x1="260" y1="190" x2="260" y2="48" />
          <line x1="260" y1="190" x2="405" y2="86" />
          <line x1="260" y1="190" x2="430" y2="255" />
          <line x1="260" y1="190" x2="255" y2="330" />
          <line x1="260" y1="190" x2="125" y2="292" />

          <line x1="115" y1="92" x2="260" y2="48" />
          <line x1="260" y1="48" x2="405" y2="86" />
          <line x1="405" y1="86" x2="430" y2="255" />
          <line x1="430" y1="255" x2="255" y2="330" />
          <line x1="255" y1="330" x2="125" y2="292" />
          <line x1="125" y1="292" x2="115" y2="92" />
        </g>

        {/* Center ring */}
        <circle
          cx="260"
          cy="190"
          r="76"
          className="network-center-ring"
        />

        {/* Satellite nodes */}
        <g className="network-node network-node--1">
          <circle
            cx="115"
            cy="92"
            r="27"
            className="network-node__cyan"
          />
        </g>

        <g className="network-node network-node--2">
          <circle
            cx="260"
            cy="48"
            r="27"
            className="network-node__indigo"
          />
        </g>

        <g className="network-node network-node--3">
          <circle
            cx="405"
            cy="86"
            r="31"
            className="network-node__indigo"
          />
        </g>

        <g className="network-node network-node--4">
          <circle
            cx="430"
            cy="255"
            r="27"
            className="network-node__cyan"
          />
        </g>

        <g className="network-node network-node--5">
          <circle
            cx="255"
            cy="330"
            r="25"
            className="network-node__cyan"
          />
        </g>

        <g className="network-node network-node--6">
          <circle
            cx="125"
            cy="292"
            r="31"
            className="network-node__indigo"
          />
        </g>

        {/* Center */}
        <circle
          cx="260"
          cy="190"
          r="58"
          className="network-center"
        />

        <text
          x="260"
          y="203"
          textAnchor="middle"
          className="network-center-text"
        >
          10x
        </text>
      </svg>
    </div>
  );
}

export function LoginPage() {
  const [values, setValues] =
    useState<LoginFormValues>(initialValues);

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [keepSignedIn, setKeepSignedIn] =
    useState(true);

  const {
    characters,
    refresh,
    isValid,
  } = useCaptcha();

  function updateValue(
    field: keyof LoginFormValues,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
      form: undefined,
    }));

    setSuccessMessage("");
  }

  function validateField(
    field: keyof LoginFormValues,
  ) {
    const fieldErrors = validateLogin(values);

    setErrors((current) => ({
      ...current,
      [field]: fieldErrors[field],
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSuccessMessage("");

    const validationErrors =
      validateLogin(values);

    if (!isValid(values.captchaAnswer)) {
      validationErrors.captchaAnswer =
        "The verification code is incorrect.";
    }

    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await loginUser({
        email: values.email.trim(),
        password: values.password,
      });

      setSuccessMessage(
        "Login successful. Welcome back!",
      );

      setErrors({});
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      const message =
        error instanceof ApiError
          ? error.message
          : "Can't reach the server. Check your connection and try again.";

      setErrors({
        form: message,
      });

      refresh();

      setValues((current) => ({
        ...current,
        captchaAnswer: "",
      }));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-shell">
      {/* =====================================================
          LEFT BRAND PANEL
      ====================================================== */}

      <section
        className="brand-panel"
        aria-label="We10x introduction"
      >
        <div className="brand-panel__background-glow brand-panel__background-glow--one" />
        <div className="brand-panel__background-glow brand-panel__background-glow--two" />

        <div className="brand-panel__content">
          <div className="brand-panel__logo">
            <BrandLogo />
          </div>

          <div className="brand-panel__main">
            <TeamNetworkIllustration />

            <div className="brand-copy">
              <h1>
                <span>Alone we go fast,</span>
                <br />

                <span className="brand-copy__highlight">
                  together we go{" "}
                  <strong>10x.</strong>
                </span>
              </h1>

              <p>
                Log in, join your team, and
                <br className="desktop-break" />
                {" "}multiply your productivity.
              </p>
            </div>
          </div>

          <footer className="brand-footer">
            © 2026 We10x. Work together. Grow 10x.
          </footer>
        </div>
      </section>

      {/* =====================================================
          RIGHT LOGIN PANEL
      ====================================================== */}

      <section className="form-panel">
        <div className="login-card">
          {/* Mobile logo */}
          <div className="mobile-brand">
            <BrandLogo compact />
          </div>

          <header className="login-header">
            <h2>Welcome back</h2>

            <p>
              Log in to continue working with your team.
            </p>
          </header>

          {/* Existing API error state */}
          {errors.form && (
            <div
              className="form-alert"
              role="alert"
            >
              <span
                className="form-alert__icon"
                aria-hidden="true"
              >
                <AlertIcon />
              </span>

              <span>{errors.form}</span>
            </div>
          )}

          {/* Existing success state */}
          {successMessage && (
            <div
              className="form-alert form-alert--success"
              role="status"
            >
              <span
                className="form-alert__icon"
                aria-hidden="true"
              >
                ✓
              </span>

              <span>{successMessage}</span>
            </div>
          )}

          {/* Google UI only.
              No authentication logic has been added. */}
          <button
            type="button"
            className="google-button"
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          <div
            className="divider"
            aria-hidden="true"
          >
            <span />
            <p>or log in with email</p>
            <span />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
          >
            {/* EMAIL */}

            <div className="field">
              <label
                className="field__label"
                htmlFor="email"
              >
                Email
              </label>

              <div
                className={`input-shell ${
                  errors.email ? "is-error" : ""
                }`}
              >
                <span
                  className="input-icon"
                  aria-hidden="true"
                >
                  <MailIcon />
                </span>

                <input
                  id="email"
                  name="email"
                  className="text-input"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={(event) =>
                    updateValue(
                      "email",
                      event.target.value,
                    )
                  }
                  onBlur={() =>
                    validateField("email")
                  }
                  disabled={isSubmitting}
                  aria-invalid={Boolean(
                    errors.email,
                  )}
                  aria-describedby={
                    errors.email
                      ? "email-error"
                      : undefined
                  }
                />
              </div>

              {errors.email && (
                <p
                  className="field__error"
                  id="email-error"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD */}

            <PasswordInput
              value={values.password}
              onChange={(value) =>
                updateValue("password", value)
              }
              onBlur={() =>
                validateField("password")
              }
              error={errors.password}
              disabled={isSubmitting}
            />

            {/* OPTIONS */}

            <div className="login-options">
              <label className="checkbox-control">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(event) =>
                    setKeepSignedIn(
                      event.target.checked,
                    )
                  }
                  disabled={isSubmitting}
                />

                <span className="custom-checkbox">
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      d="m3.2 8 3 3 6.6-6.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span>Keep me signed in</span>
              </label>

              {/* UI-only because forgot-password is outside
                  the existing login scope. */}
              <button
                type="button"
                className="text-link-button"
              >
                Forgot password?
              </button>
            </div>

            {/* CAPTCHA */}

            <Captcha
              characters={characters}
              answer={values.captchaAnswer}
              onAnswerChange={(value) =>
                updateValue(
                  "captchaAnswer",
                  value,
                )
              }
              onRefresh={() => {
                refresh();

                updateValue(
                  "captchaAnswer",
                  "",
                );
              }}
              error={errors.captchaAnswer}
              disabled={isSubmitting}
            />

            {/* SUBMIT */}

            <button
              className="login-button"
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner"
                    aria-hidden="true"
                  />

                  <span>
                    Logging in…
                  </span>
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* UI-only account creation link.
              No registration logic is added. */}
          <p className="signup-line">
            <span>New to We10x?</span>{" "}

            <button
              type="button"
              className="text-link-button"
            >
              Create an account
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}