import { Box, Collapse, Group, ThemeIcon, UnstyledButton } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { IconChevronRight, TablerIcon } from "@tabler/icons";
import { Link, useMatchRoute } from "@tanstack/react-location";
import React from "react";
import { NavButton } from "./NavButton";

export function LinksGroup({
  icon: Icon,
  label,
  links,
}: {
  icon: TablerIcon;
  label: React.ReactNode;
  links: { label: React.ReactNode; to: string }[];
}) {
  const [opened, toggleOpened] = useToggle();

  const matchRoute = useMatchRoute();

  const matches = links.some((link) => matchRoute(link));

  if (matches && !opened) {
    toggleOpened(true);
  }

  return (
    <>
      <UnstyledButton
        onClick={() => toggleOpened()}
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
        })}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          <IconChevronRight
            size={14}
            stroke={1.5}
            style={{
              transition: "transform 200ms ease",
              transform: opened ? `rotate(90deg)` : "none",
            }}
          />
        </Group>
      </UnstyledButton>
      <Collapse in={opened}>
        {links.map((link) => (
          <NavButton
            component={Link}
            key={link.to}
            to={link.to}
            children={link.label}
            sx={(theme) => ({
              padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
              paddingLeft: 31,
              marginLeft: 30,
              borderLeft: `1px solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[4]
                  : theme.colors.gray[3]
              }`,
              ...(matchRoute(link) && {
                borderLeftColor: "transparent",
              }),
            })}
          />
        ))}
      </Collapse>
    </>
  );
}
