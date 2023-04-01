export function Background({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <>
      <defs>
        <filter id="paper" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".05"
            result="noise"
            numOctaves="1"
            stitchTiles="stitch"
          />
          <feOffset in="tiledNoise" result="offsetNoise" />
          <feDiffuseLighting
            in="offsetNoise"
            lightingColor="#fff"
            surfaceScale="1"
            result="diffuse"
          >
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feBlend in="SourceGraphic" in2="diffuse" mode="multiply" />
        </filter>
      </defs>

      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="#0e5d9e"
        style={{
          filter: "url(#paper)",
          transform: `translate(${x % width}px, ${y % height}px)`,
        }}
      />
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="#0e5d9e"
        style={{
          filter: "url(#paper)",
          transform: `translate(${
            (x % width) + (x % width < -40 ? width : -width)
          }px, ${y % height}px)`,
        }}
      />

      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="#0e5d9e"
        style={{
          filter: "url(#paper)",
          transform: `translate(${x % width}px, ${
            (y % height) + (y % height < -40 ? height : -height)
          }px)`,
        }}
      />
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="#0e5d9e"
        style={{
          filter: "url(#paper)",
          transform: `translate(${
            (x % width) + (x % width < -40 ? width : -width)
          }px, ${(y % height) + (y % height < -40 ? height : -height)}px)`,
        }}
      />
    </>
  );
}
