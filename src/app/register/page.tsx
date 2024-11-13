"use client";
import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const authFetch = useAuthFetch();

  const register = async (formData: any) => {
    startLoading();
    await authFetch({
      endpoint: "register",
      redirectRoute: "/home",
      formData,
    });
    finishLoading();
  };

  return (
    <Form
      description="(*) Porfavor completa todos los campos"
      onSubmit={register}
      title="Registrate"
    >
      <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
          placeholder="Ingresa tu correo..."
          label="Correo electrónico"
          name="email"
        />
        <Form.Input
          placeholder="Ingresa tu contraseña..."
          label="Contraseña"
          name="password"
          type="password"
        />
        <Form.Input
          placeholder="Repite tu contraseña..."
          name="confirmPassword"
          label="Contraseña"
          type="password"
        />
      </div>
      <Form.SubmitButton buttonText="Crear Cuenta" isLoading={isLoading} />
      <Form.Footer
        description="¿Ya tenes cuenta?"
        textLink="Iniciar Sesión"
        link="/"
      />
    </Form>
  );
}
