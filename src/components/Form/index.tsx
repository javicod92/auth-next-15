"use client";

import { Footer, Input, SubmitButton } from "./components";
import React, { createContext, useState } from "react";
import styles from "./styles.module.scss";

type FormValues = Record<string, string>;

interface FormContextType {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

interface FormProps {
  title: string;
  description?: string;
  onSubmit: (values: FormValues) => void;
  children: React.ReactNode;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export function Form({ title, children, onSubmit, description }: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      <form action="" className={`${styles.form} card`} onSubmit={handleSubmit}>
        <div className={styles.descriptionContainer}>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {children}
      </form>
    </FormContext.Provider>
  );
}

Form.Input = Input;
Form.Footer = Footer;
Form.SubmitButton = SubmitButton;
