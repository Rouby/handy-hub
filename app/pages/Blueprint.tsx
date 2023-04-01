import { Box, SegmentedControl } from "@mantine/core";
import { IconArrowsMove, IconRectangle } from "@tabler/icons";
import { useMatch } from "@tanstack/react-location";
import { useMemo, useState } from "react";
import { View } from "../components";
import { trpc } from "../trpc.client";

export function BlueprintPage() {
  const { params } = useMatch();

  const { data: blueprint } = trpc.blueprint.get.useQuery(params.id);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [scale, setScale] = useState(1);

  const objects = useMemo(
    () => [
      {
        type: "box",
        params: {
          x: 0,
          y: 0,
          z: 0,
          width: 100,
          height: 200,
          depth: 100,
        },
      },
    ],
    []
  );

  const [selectedTool, setSelectedTool] = useState("view");

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "grid",
          gridTemplateAreas: `
            "view1 view1 tools"
            "view1 view1 tools"
          `,
          gridTemplateColumns: "1fr 1fr auto",
          gridTemplateRows: "1fr 1fr",
        }}
      >
        <View
          coordinates={{ x, z }}
          onChangeCoordinate0={setX}
          onChangeCoordinate1={setZ}
          scale={scale}
          onChangeScale={setScale}
          objects={objects}
          onSelectObject={(object) => {
            console.log(object);
          }}
          sx={{ gridArea: "view1" }}
        />

        {/* <View
          coordinates={{ x, y }}
          onChangeCoordinate0={setX}
          onChangeCoordinate1={setY}
          scale={scale}
          onChangeScale={setScale}
          objects={objects}
          sx={{ gridArea: "view2" }}
        />

        <View
          coordinates={{ z, y }}
          onChangeCoordinate0={setZ}
          onChangeCoordinate1={setY}
          scale={scale}
          onChangeScale={setScale}
          objects={objects}
          sx={{ gridArea: "view3" }}
        /> */}

        <Box sx={{ gridArea: "tools" }}>
          <SegmentedControl
            value={selectedTool}
            onChange={setSelectedTool}
            data={[
              { value: "view", label: <IconArrowsMove /> },
              { value: "create-box", label: <IconRectangle /> },
            ]}
            orientation="vertical"
            size="xs"
          />
        </Box>
      </Box>
    </>
  );
}
