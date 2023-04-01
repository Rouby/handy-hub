import { Group, Image, Text } from "@mantine/core";
import { Link } from "@tanstack/react-location";

export function Logo() {
  return (
    <Link to="/" style={{ all: "inherit", cursor: "pointer" }}>
      <Group>
        <Image
          src="/icon-512x512.png"
          alt="Logo"
          width={30}
          height={30}
          radius="sm"
        />
        <Text variant="text">Handy Hub</Text>
      </Group>
    </Link>
  );
}
