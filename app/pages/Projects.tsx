import { Button, Table } from "@mantine/core";
import { Link } from "@tanstack/react-location";
import { trpc } from "../trpc.client";

export function ProjectsPage() {
  const { data: projects } = trpc.project.list.useQuery();
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Due</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {projects?.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.location}</td>
              <td>{project.dueAt}</td>
              <td>
                <Button
                  component={Link}
                  to={`${project.id}`}
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
