import { Box, Code, Group, Navbar, ScrollArea } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { Link, useMatches } from "@tanstack/react-location";
import { version } from "../../package.json";
import { Logo } from "./Logo";
import { NavButton } from "./NavButton";

export function Navigation() {
  const matches = useMatches<{
    RouteMeta: { linkGroups?: React.ComponentType; backToId?: string };
  }>();

  const { linkGroups: LinksGroups, backToId } =
    [...matches].reverse().find((match) => match.route?.meta?.linkGroups)?.route
      .meta ?? {};

  const backTo =
    backToId && matches.find((match) => match.route?.id === backToId)?.pathname;

  return (
    <Navbar
      width={{ sm: 300 }}
      p="md"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
      })}
    >
      <Navbar.Section
        sx={(theme) => ({
          padding: theme.spacing.md,
          paddingTop: 0,
          marginLeft: -theme.spacing.md,
          marginRight: -theme.spacing.md,
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
          borderBottom: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[3]
          }`,
        })}
      >
        <Group position="apart">
          <Logo />
          <Link style={{ all: "inherit", cursor: "pointer" }} to="/changelog">
            <Code sx={{ fontWeight: 700 }}>v{version}</Code>
          </Link>
        </Group>
      </Navbar.Section>

      <Navbar.Section
        grow
        sx={(theme) => ({
          marginLeft: -theme.spacing.md,
          marginRight: -theme.spacing.md,
        })}
        component={ScrollArea}
      >
        <Box
          sx={(theme) => ({
            paddingTop: theme.spacing.xl,
            paddingBottom: theme.spacing.xl,
          })}
        >
          {backTo && (
            <NavButton icon={IconArrowBack} component={Link} to={backTo}>
              Back
            </NavButton>
          )}
          {LinksGroups && <LinksGroups />}
        </Box>
      </Navbar.Section>

      <Navbar.Section
        sx={(theme) => ({
          marginLeft: -theme.spacing.md,
          marginRight: -theme.spacing.md,
          borderTop: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[3]
          }`,
        })}
      >
        {/* <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name="Ann Nullpointer"
          email="anullpointer@yahoo.com"
        /> */}
      </Navbar.Section>
    </Navbar>
  );
}
