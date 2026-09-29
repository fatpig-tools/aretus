// Prints a GLB's node tree (name, triangles, world bbox) and texture sizes. Usage: node scripts/inspect-model.mjs file.glb [maxDepth]
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { getBounds } from "@gltf-transform/core";

const [file, depthArg = "6"] = process.argv.slice(2);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(file);
const root = doc.getRoot();

function tris(node) {
  let n = 0;
  const mesh = node.getMesh();
  if (mesh) for (const p of mesh.listPrimitives()) n += (p.getIndices()?.getCount() ?? p.getAttribute("POSITION").getCount()) / 3;
  for (const c of node.listChildren()) n += tris(c);
  return n;
}
const fmt = (v) => v.map((x) => x.toFixed(2)).join(",");
function walk(node, depth) {
  if (depth > Number(depthArg)) return;
  const t = tris(node);
  if (t === 0 && !node.listChildren().length) return;
  const b = getBounds(node);
  console.log(`${"  ".repeat(depth)}${node.getName() || "(unnamed)"}  tris=${Math.round(t)}  min=[${fmt(b.min)}] max=[${fmt(b.max)}]`);
  for (const c of node.listChildren()) walk(c, depth + 1);
}
for (const scene of root.listScenes()) for (const n of scene.listChildren()) walk(n, 0);
console.log("textures:");
for (const tex of root.listTextures()) {
  const size = tex.getSize();
  console.log(`  ${tex.getName() || tex.getURI() || "(tex)"} ${tex.getMimeType()} ${size?.join("x")} ${(tex.getImage().byteLength / 1024).toFixed(0)}KB`);
}
console.log("materials:", root.listMaterials().map((m) => m.getName()).join(" | "));
