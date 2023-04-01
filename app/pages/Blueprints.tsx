import { Button, Table } from "@mantine/core";
import { Link, useMatch } from "@tanstack/react-location";
import { trpc } from "../trpc.client";

export function BlueprintsPage() {
  const { params } = useMatch();
  const { data: blueprints } = trpc.blueprint.list.useQuery({
    projectId: params.id,
  });
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {blueprints?.map((blueprint) => (
            <tr key={blueprint.id}>
              <td>{blueprint.name}</td>
              <td>
                <Button
                  component={Link}
                  to={`${blueprint.id}`}
                  variant="light"
                  size="xs"
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
