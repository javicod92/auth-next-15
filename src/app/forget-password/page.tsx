"use client";
import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const authFetch = useAuthFetch();

  const forgetPassword = async (formData: any) => {
    startLoading();
    await authFetch({
      endpoint: "forget-password",
      formData,
    });
    finishLoading();
  };

  return (
    <Form
      description="(*) Porfavor completa todos los campos"
      onSubmit={forgetPassword}
      title="Recuperar Contraseña"
    >
      <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
          placeholder="Ingresa tu correo..."
          label="Correo electrónico"
          name="email"
        />
      </div>
      <Form.SubmitButton buttonText="Recuperar cuenta" isLoading={isLoading} />
      <Form.Footer description="Volver al inicio" textLink="Inicio" link="/" />
    </Form>
  );
}
