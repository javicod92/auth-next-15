"use client";

import React, { useContext } from "react";
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
      <input
        type={type}
        id={name}
        name={name}
        value={formValues[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}
