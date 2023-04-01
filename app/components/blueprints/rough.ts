import rough from "roughjs";

export const generator = rough.generator({
  options: {
    stroke: "white",
    fillStyle: "hachure",
    hachureGap: 8,
    hachureAngle: 70,
    roughness: 2,
    preserveVertices: true,
    seed: 69,
  },
});
