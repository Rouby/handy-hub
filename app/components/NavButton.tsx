import {
  Box,
  Group,
  ThemeIcon,
  UnstyledButton,
  UnstyledButtonProps,
} from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import { Link, useMatchRoute } from "@tanstack/react-location";

export function NavButton<C = "button">({
  children,
  icon: Icon,
  ...props
}: import("@mantine/utils").PolymorphicComponentProps<
  C,
  UnstyledButtonProps
> & {
  icon?: TablerIcon;
}) {
  const matchRoute = useMatchRoute();

  return (
    <UnstyledButton
      {...props}
      sx={(theme) => ({
        fontWeight: 500,
        display: "block",
        width: "100%",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },

        ...(props.component === Link &&
          matchRoute({ to: (props as any).to, fuzzy: false }) && {
            backgroundColor: theme.fn.variant({
              variant: "light",
              color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
              variant: "light",
              color: theme.primaryColor,
            }).color,
            borderLeftColor: "transparent",

            "&:hover": {},
          }),

        ...(typeof props.sx === "function" ? props.sx(theme) : props.sx),
      })}
    >
      <Group position="apart" spacing={0}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {Icon && (
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
          )}
          <Box ml={Icon ? "md" : undefined}>{children}</Box>
        </Box>
      </Group>
    </UnstyledButton>
  );
}
