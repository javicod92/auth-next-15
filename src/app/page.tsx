"use client";
import { Form } from "@/components/Form";

export default function LoginPage() {
  return (
    <Form
      title="Iniciar Sesión"
      onSubmit={() => {}}
      description="(*) Porfavor completa todos los campos"
    >
      <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
          label="Correo electrónico"
          name="email"
          placeholder="Ingresa tu correo..."
        />
        <Form.Input
          label="Contraseña"
          name="password"
          placeholder="Ingresa tu contraseña..."
          type="password"
        />
      </div>
      <Form.SubmitButton
        buttonText="Iniciar Sesión" /* isLoading={isLoading} */
      />
      <Form.Footer
        description="¿Olvidaste la contraseña?"
        link="/forget-password"
        textLink="Recuperar contraseña"
      />
      <Form.Footer
        description="¿Todavía no estas registrado?"
        link="/register"
        textLink="Regístrate"
      />
    </Form>
  );
}
