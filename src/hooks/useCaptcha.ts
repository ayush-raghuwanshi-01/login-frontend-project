import { useCallback, useMemo, useState } from "react";

const CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CAPTCHA_LENGTH = 5;

function createCaptchaValue(): string {
  const values = new Uint32Array(CAPTCHA_LENGTH);
  crypto.getRandomValues(values);

  return Array.from(values, (value) =>
    CHARACTERS[value % CHARACTERS.length],
  ).join("");
}

export function useCaptcha() {
  const [value, setValue] = useState(createCaptchaValue);

  const refresh = useCallback(() => {
    setValue(createCaptchaValue());
  }, []);

  const isValid = useCallback(
    (answer: string) => answer.trim().toUpperCase() === value,
    [value],
  );

  const characters = useMemo(
    () =>
      value.split("").map((character, index) => ({
        character,
        rotation: ((index * 17 + value.charCodeAt(index)) % 13) - 6,
        offsetY: ((index * 11 + value.charCodeAt(index)) % 9) - 4,
      })),
    [value],
  );

  return { value, characters, refresh, isValid };
}