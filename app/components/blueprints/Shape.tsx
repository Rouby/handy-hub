import { Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { useMemo } from "react";
import { generator } from "./rough";

const scaleColor = "rgba(169,169,169,0.8)";

export function Shape({
  view,
  type,
  params,
  onClick,
}: {
  view: `${"x" | "y" | "z"}${"x" | "y" | "z"}`;
  type: string;
  params: any;
  onClick?: () => void;
}) {
  const xName = view[0];
  const yName = view[1];
  const xSize =
    view[0] === "x" ? "width" : view[0] === "z" ? "depth" : "height";
  const ySize =
    view[1] === "x" ? "width" : view[1] === "z" ? "depth" : "height";

  const [hovered, setHovered] = useToggle();

  switch (type) {
    case "box":
      const paths = useMemo(
        () => [
          ...generator.toPaths(
            generator.rectangle(
              params[xName],
              params[yName],
              params[xSize],
              params[ySize],
              {
                fill: "white",
              }
            )
          ),
        ],
        [params]
      );

      const scale = useMemo(
        () =>
          hovered
            ? [
                ...generator.toPaths(
                  generator.line(
                    params[xName] - 20,
                    params[yName],
                    params[xName] - 20,
                    params[yName] + params[ySize],
                    {
                      disableMultiStroke: true,
                      roughness: 1,
                      stroke: scaleColor,
                    }
                  )
                ),
                ...generator.toPaths(
                  generator.line(
                    params[xName] - 25,
                    params[yName],
                    params[xName] - 15,
                    params[yName],
                    {
                      stroke: scaleColor,
                    }
                  )
                ),
                ...generator.toPaths(
                  generator.line(
                    params[xName] - 25,
                    params[yName] + params[ySize],
                    params[xName] - 15,
                    params[yName] + params[ySize],
                    {
                      stroke: scaleColor,
                    }
                  )
                ),

                ...generator.toPaths(
                  generator.line(
                    params[xName],
                    params[yName] - 20,
                    params[xName] + params[xSize],
                    params[yName] - 20,
                    {
                      disableMultiStroke: true,
                      roughness: 1,
                      stroke: scaleColor,
                    }
                  )
                ),
                ...generator.toPaths(
                  generator.line(
                    params[xName],
                    params[yName] - 25,
                    params[xName],
                    params[yName] - 15,
                    {
                      stroke: scaleColor,
                    }
                  )
                ),
                ...generator.toPaths(
                  generator.line(
                    params[xName] + params[xSize],
                    params[yName] - 25,
                    params[xName] + params[xSize],
                    params[yName] - 15,
                    {
                      stroke: scaleColor,
                    }
                  )
                ),
              ]
            : [],
        [hovered]
      );

      return (
        <>
          {[...paths, ...scale].map((path) => (
            <path key={path.d} {...path} />
          ))}
          {hovered && (
            <g transform={`translate(${params[xName]},${params[yName]})`}>
              <Text
                component="text"
                textAnchor="middle"
                size="xs"
                fill={scaleColor}
                dx={-params[ySize] / 2}
                dy={-25}
                sx={{
                  transform: "rotate(-90deg)",
                  fontFamily: "Comic Sans MS",
                }}
              >
                {params[ySize]}cm
              </Text>
              <Text
                component="text"
                textAnchor="middle"
                size="xs"
                fill={scaleColor}
                dx={params[xSize] / 2}
                dy={-25}
                sx={{
                  fontFamily: "Comic Sans MS",
                }}
              >
                {params[xSize]}cm
              </Text>
            </g>
          )}
          <rect
            x={params[xName] - 50 * +hovered}
            y={params[yName] - 50 * +hovered}
            width={params[xSize] + 100 * +hovered}
            height={params[ySize] + 100 * +hovered}
            fill="transparent"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        </>
      );

    default:
      return null;
  }
}
