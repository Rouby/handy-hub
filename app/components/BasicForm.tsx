import {
  Checkbox,
  CheckboxProps,
  NumberInput,
  PasswordInput,
  Stack,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { createTsForm, useTsController } from "@ts-react/form";
import { z } from "zod";

const mapping = [
  [z.string(), StringInput],
  [z.boolean(), BooleanInput],
  [z.number(), NumberInput],
] as const;

export const BasicForm = createTsForm(mapping, { FormComponent: Form });

function Form({ children, ...props }: { children: React.ReactNode }) {
  return (
    <form {...props}>
      <Stack>{children}</Stack>
    </form>
  );
}

function StringInput(props: TextInputProps) {
  const { field } = useTsController<string>();

  if (props.type === "password") {
    return (
      <PasswordInput
        {...props}
        ref={field.ref}
        name={field.name}
        value={field.value ?? ""}
        onChange={({ target: { value } }) => field.onChange(value)}
        onBlur={field.onBlur}
      />
    );
  }

  return (
    <TextInput
      {...props}
      ref={field.ref}
      name={field.name}
      value={field.value ?? ""}
      onChange={({ target: { value } }) => field.onChange(value)}
      onBlur={field.onBlur}
    />
  );
}

function BooleanInput(props: CheckboxProps) {
  const { field } = useTsController<boolean>();

  return (
    <Checkbox
      {...props}
      ref={field.ref}
      name={field.name}
      checked={field.value ?? false}
      onChange={({ target: { checked } }) => field.onChange(checked)}
      onBlur={field.onBlur}
    />
  );
}
