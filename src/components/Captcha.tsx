interface CaptchaCharacter {
  character: string;
  rotation: number;
  offsetY: number;
}

interface CaptchaProps {
  characters: CaptchaCharacter[];
  answer: string;
  onAnswerChange: (value: string) => void;
  onRefresh: () => void;
  error?: string;
  disabled?: boolean;
}

function RefreshIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 11a8 8 0 0 0-14.9-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 3v4h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 13a8 8 0 0 0 14.9 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 21v-4h-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Captcha({
  characters,
  answer,
  onAnswerChange,
  onRefresh,
  error,
  disabled = false,
}: CaptchaProps) {
  return (
    <div className="field captcha-field">
      <label className="field__label" htmlFor="captcha">
        Verification
      </label>

      <div className="captcha-row">
        <div
          className={`captcha-image ${error ? "is-error" : ""}`}
          role="img"
          aria-label="Verification code image"
        >
          <svg
            viewBox="0 0 240 48"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="captcha-noise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.85"
                  numOctaves="2"
                  stitchTiles="stitch"
                />

                <feColorMatrix type="saturate" values="0" />

                <feComponentTransfer>
                  <feFuncA type="table" tableValues="0 0.09" />
                </feComponentTransfer>
              </filter>
            </defs>

            <rect
              width="240"
              height="48"
              fill="#EEF2FF"
            />

            <rect
              width="240"
              height="48"
              filter="url(#captcha-noise)"
            />

            <path
              d="M6 16 C45 4, 75 30, 120 18 S190 7, 234 18"
              className="captcha-line"
            />

            <path
              d="M5 34 C55 19, 78 42, 128 28 S192 22, 235 34"
              className="captcha-line"
            />

            {characters.map((item, index) => (
              <text
                key={`${item.character}-${index}`}
                x={35 + index * 43}
                y={32 + item.offsetY}
                transform={`rotate(${item.rotation} ${
                  35 + index * 43
                } 32)`}
                className="captcha-character"
              >
                {item.character}
              </text>
            ))}
          </svg>
        </div>

        <button
          type="button"
          className="captcha-refresh"
          onClick={onRefresh}
          disabled={disabled}
          aria-label="Refresh verification code"
          title="Refresh verification code"
        >
          <RefreshIcon />
        </button>

        <div className="captcha-input-wrapper">
          <input
            id="captcha"
            name="captcha"
            className={`text-input captcha-input ${
              error ? "is-error" : ""
            }`}
            type="text"
            inputMode="text"
            autoComplete="off"
            maxLength={5}
            placeholder="Enter the code"
            value={answer}
            onChange={(event) =>
              onAnswerChange(
                event.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, ""),
              )
            }
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? "captcha-error" : undefined
            }
          />
        </div>
      </div>

      {error && (
        <p
          className="field__error"
          id="captcha-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}