import { useMatch } from "@tanstack/react-location";
import { trpc } from "../trpc.client";

export function ProjectOverviewPage() {
  const { params } = useMatch();

  const { data: project } = trpc.project.get.useQuery(params.id);

  return <>Details for {project?.name}</>;
}
