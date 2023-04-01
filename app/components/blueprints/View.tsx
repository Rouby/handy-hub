import { Box, BoxProps } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Background } from "./Background";
import { Scales } from "./Scales";
import { Shape } from "./Shape";

export function View({
  coordinates,
  onChangeCoordinate0: setCoordinate0,
  onChangeCoordinate1: setCoordinate1,
  scale,
  onChangeScale: setScale,
  objects,
  onSelectObject: setSelectedObject,
  sx,
}: {
  coordinates:
    | { x: number; y: number }
    | { x: number; z: number }
    | { z: number; y: number };
  scale: number;
  onChangeCoordinate0: (v: number) => void;
  onChangeCoordinate1: (v: number) => void;
  onChangeScale: (scale: number) => void;
  objects: { type: string; params: any }[];
  onSelectObject: (object: { type: string; params: any }) => void;
  sx?: BoxProps["sx"];
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);

  const [x, y] = Object.values(coordinates);
  const [xName, yName] = Object.keys(coordinates) as [
    "x" | "y" | "z",
    "x" | "y" | "z"
  ];

  useEffect(() => {
    handleSvgResize();

    window.addEventListener("resize", handleSvgResize);
    return () => window.removeEventListener("resize", handleSvgResize);

    function handleSvgResize() {
      if (svgRef.current) {
        setSvgWidth(svgRef.current.clientWidth);
        setSvgHeight(svgRef.current.clientHeight);
      }
    }
  }, []);

  return (
    <Box
      component="svg"
      sx={sx}
      width="100%"
      height="100%"
      ref={svgRef}
      onMouseDown={(event) => {
        event.preventDefault();

        const initialX = event.clientX - x;
        const initialY = event.clientY - y;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        function handleMouseMove(event: MouseEvent) {
          setCoordinate0(event.clientX - initialX);
          setCoordinate1(event.clientY - initialY);
        }

        function handleMouseUp() {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        }
      }}
      onWheel={(event) => {
        const delta = event.deltaY;
        const newScale = Math.max(
          0.5,
          Math.min(4, delta > 0 ? scale - 0.1 : scale + 0.1)
        );

        if (svgRef.current) {
          const svgRect = svgRef.current.getBoundingClientRect();
          const cursorX = (event.clientX - svgRect.x - x) / scale;
          const cursorY = (event.clientY - svgRect.y - y) / scale;

          setScale(newScale);
          setCoordinate0(
            Math.round(event.clientX - cursorX * newScale - svgRect.x)
          );
          setCoordinate1(
            Math.round(event.clientY - cursorY * newScale - svgRect.y)
          );
        }
      }}
    >
      <Background x={x} y={y} width={svgWidth} height={svgHeight} />

      <g
        transform={`translate(${x} ${y}) scale(${scale}) translate(${40} ${40})`}
      >
        {objects.map((object, i) => (
          <Shape
            key={i}
            view={`${xName}${yName}`}
            {...object}
            onClick={() => setSelectedObject(object)}
          />
        ))}
      </g>

      <Scales
        width={svgWidth}
        height={svgHeight}
        size={40}
        scale={scale}
        offsetX={x}
        offsetY={y}
      />
    </Box>
  );
}
