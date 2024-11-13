"use client";
import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { AxiosRequestConfig } from "axios";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const searchParams = useSearchParams();
  const authFetch = useAuthFetch();

  const changePassword = async (formData: any) => {
    startLoading();

    const token = searchParams.get("token");

    const options: AxiosRequestConfig<any> = {
      headers: {
        token,
      },
    };

    await authFetch({
      endpoint: "change-password",
      formData,
      redirectRoute: "/",
      options,
    });
    finishLoading();
  };

  return (
    <Form
      description="(*) Porfavor completa todos los campos"
      onSubmit={changePassword}
      title="Cambiar Contraseña"
    >
      <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
          placeholder="Ingresa tu nueva contraseña..."
          label="Contraseña"
          name="newPassword"
          type="password"
        />
        <Form.Input
          placeholder="Repite tu nueva contraseña..."
          label="Confirmar contraseña"
          name="confirmNewPassword"
          type="password"
        />
      </div>
      <Form.SubmitButton
        buttonText="Cambiar contraseña"
        isLoading={isLoading}
      />
    </Form>
  );
}
