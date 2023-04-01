import { Button, Group, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { z } from "zod";
import { BasicForm } from "./BasicForm";

export function LoginForm({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (values: {
    email: string;
    password: string;
    rememberMe: boolean;
    name: string;
    mode: "login" | "register";
  }) => void;
  loading: boolean;
  error?: React.ReactNode;
}) {
  const [mode, toggleMode] = useToggle(["login", "register"] as const);

  return (
    <BasicForm
      schema={
        mode === "login"
          ? z.object({
              email: z.string(),
              password: z.string(),
              rememberMe: z.boolean(),
            })
          : z.object({
              email: z.string(),
              password: z.string(),
              name: z.string(),
            })
      }
      props={{
        email: {
          autoComplete: "username",
          label: "Email",
          type: "email",
        },
        password: {
          autoComplete: mode === "login" ? "current-password" : "new-password",
          label: "Password",
          type: "password",
        },
        rememberMe: {
          label: "Remember me",
        },
        name: {
          label: "Name",
        },
      }}
      defaultValues={{
        rememberMe: true,
      }}
      renderAfter={() => (
        <Group position="apart" mt="md" noWrap>
          <Text color="red">{error}</Text>
          <Group position="right" noWrap>
            <Button
              variant="subtle"
              disabled={loading}
              onClick={() => toggleMode()}
            >
              {mode === "register" ? "Login" : "Create Account"}
            </Button>
            <Button type="submit" loading={loading}>
              {mode === "login" ? "Login" : "Register"}
            </Button>
          </Group>
        </Group>
      )}
      onSubmit={(values) => onSubmit({ ...(values as any), mode })}
    />
  );
}
