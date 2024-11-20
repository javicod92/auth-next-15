"use client";

import React, { useContext, useState } from "react";
import { FormContext } from "..";
import styles from "./styles.module.scss";

interface InputProps {
  type?: "text" | "password";
  name: string;
  label: string;
  placeholder?: string;
}

export function Input({ label, name, placeholder, type }: InputProps) {
  const { formValues, setFormValues } = useContext(FormContext)!;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className="flex gap-1">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={formValues[name] || ""}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {type === "password" && (
          <div
            className="flex cursor-pointer border-[0.5px] border-[#878787] rounded-lg p-1 items-center justify-center"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
