import { Box } from "@mantine/core";
import { useMemo } from "react";

export function Scales({
  width,
  height,
  size,
  scale,
  offsetX,
  offsetY,
}: {
  width: number;
  height: number;
  size: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}) {
  const horizontalTicks = useMemo(() => {
    if (!width || !height) return null;

    const distance = 10 * scale;

    return (
      <>
        <Box
          component="path"
          d={Array(Math.ceil(width / distance) * 2)
            .fill(0)
            .map((_, i) => 10 + (i % 10 === 0 ? 20 : 0))
            .reduce((acc, s) => acc + ` v${s} m${distance},${-s}`, `M0,0`)}
          sx={{
            stroke: "#cdcdcd",
            strokeWidth: 2,
            fill: "none",
            opacity: 0.76,
          }}
        />
        <Box
          component="path"
          d={Array(Math.ceil(width / distance) * 2)
            .fill(0)
            .map((_, i) => 10 + (i % 10 === 0 ? 20 : 0))
            .reduce(
              (acc, s) => acc + ` v${-s} m${distance},${s}`,
              `M0,${height}`
            )}
          sx={{
            stroke: "#cdcdcd",
            strokeWidth: 2,
            fill: "none",
            opacity: 0.76,
          }}
        />
      </>
    );
  }, [width, height, scale]);

  const verticalTicks = useMemo(() => {
    if (!width || !height) return null;

    const distance = 10 * scale;

    return (
      <>
        <Box
          component="path"
          d={Array(Math.ceil(height / distance) * 2)
            .fill(0)
            .map((_, i) => 10 + (i % 10 === 0 ? 20 : 0))
            .reduce((acc, s) => acc + ` h${s} m${-s},${distance}`, `M0,0`)}
          sx={{
            stroke: "#cdcdcd",
            strokeWidth: 2,
            fill: "none",
            opacity: 0.76,
          }}
        />
        <Box
          component="path"
          d={Array(Math.ceil(height / distance) * 2)
            .fill(0)
            .map((_, i) => 10 + (i % 10 === 0 ? 20 : 0))
            .reduce(
              (acc, s) => acc + ` h${-s} m${s},${distance}`,
              `M${width},0`
            )}
          sx={{
            stroke: "#cdcdcd",
            strokeWidth: 2,
            fill: "none",
            opacity: 0.76,
          }}
        />
      </>
    );
  }, [width, height, scale]);

  const grid = useMemo(() => {
    if (!width || !height) return null;

    const distance = 10 * scale;

    return (
      <>
        <Box
          component="path"
          d={Array(Math.ceil(height / distance) * 2)
            .fill(height + size * 2 + 100)
            .reduce((acc, s) => acc + ` v${s} m${distance},${-s}`, `M0,0`)}
          sx={{
            stroke: "#cdcdcd",
            strokeWidth: 2,
            fill: "none",
            opacity: 0.03,
            pointerEvents: "none",
          }}
        />
        <Box
          component="path"
          d={Array(Math.ceil(width / distance) * 2)
            .fill(width + size * 2 + 100)
            .reduce((acc, s) => acc + ` h${s} m${-s},${distance}`, `M0,0`)}
          sx={{
            stroke: "#cdcdcd",
            strokeWidth: 2,
            fill: "none",
            opacity: 0.03,
            pointerEvents: "none",
          }}
        />
      </>
    );
  }, [width, height, size, scale]);

  if (!horizontalTicks || !verticalTicks) return null;

  return (
    <g>
      <g
        transform={`translate(${
          ((size * scale + offsetX) % (100 * scale)) - 100 * scale
        }, ${((size * scale + offsetY) % (100 * scale)) - 100 * scale})`}
      >
        {grid}
      </g>
      <path
        d={`${[
          `M0,0 h${width} v${height} h${-width} v${-height}`,
          `M${size},${size} v${height - size * 2} h${width - size * 2} v${-(
            height -
            size * 2
          )}`,
        ].join(" ")} z`}
        fill="#0c5598"
        fillRule="evenodd"
      />
      <g
        transform={`translate(${
          ((size * scale + offsetX) % (100 * scale)) - 100 * scale
        }, 0)`}
      >
        {horizontalTicks}
      </g>
      <g
        transform={`translate(0, ${
          ((size * scale + offsetY) % (100 * scale)) - 100 * scale
        })`}
      >
        {verticalTicks}
      </g>
      <rect
        x="-1"
        y="-1"
        width={size + 1}
        height={size + 1}
        fill="#0c5598"
        stroke="#cdcdcd"
        strokeWidth={2}
      />
      <rect
        x={width - size + 1}
        y="-1"
        width={size + 1}
        height={size + 1}
        fill="#0c5598"
        stroke="#cdcdcd"
        strokeWidth={2}
      />
      <rect
        x="-1"
        y={height - size + 1}
        width={size + 1}
        height={size + 1}
        fill="#0c5598"
        stroke="#cdcdcd"
        strokeWidth={2}
      />
      <rect
        x={width - size + 1}
        y={height - size + 1}
        width={size + 1}
        height={size + 1}
        fill="#0c5598"
        stroke="#cdcdcd"
        strokeWidth={2}
      />
    </g>
  );
}
