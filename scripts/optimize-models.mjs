/**
 * Optimises the downloaded Sketchfab GLBs (assets-src/models) into web-ready files in public/models.
 *   node scripts/optimize-models.mjs
 * Steps per model: remove unwanted nodes, drop unused UV sets, dedup/weld, simplify, resize textures
 * to WebP, then meshopt-compress (decoded in the browser by drei's useGLTF).
 */
import { mkdir, stat } from "node:fs/promises";
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS, EXTMeshoptCompression } from "@gltf-transform/extensions";
import { dedup, prune, weld, simplify, textureCompress, meshopt, resample } from "@gltf-transform/functions";
import { MeshoptEncoder, MeshoptDecoder, MeshoptSimplifier } from "meshoptimizer";
import sharp from "sharp";

const SRC = "assets-src/models";
const OUT = "public/models";

const models = [
  { name: "excavator", ratio: 0.2, error: 0.0015, textureSize: 1024 },
  { name: "tipper", ratio: 1, textureSize: 256 },
  { name: "hyva", ratio: 0.25, error: 0.002, textureSize: 512 },
  { name: "prime-mover", ratio: 1, textureSize: 1024, removeNodes: ["Container"] },
];

await MeshoptEncoder.ready;
await MeshoptDecoder.ready;
await MeshoptSimplifier.ready;

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ "meshopt.encoder": MeshoptEncoder, "meshopt.decoder": MeshoptDecoder });

await mkdir(OUT, { recursive: true });

for (const m of models) {
  const doc = await io.read(`${SRC}/${m.name}.glb`);
  const root = doc.getRoot();

  for (const node of root.listNodes()) {
    if (m.removeNodes?.includes(node.getName())) node.dispose();
  }

  // Sketchfab exports often carry 3 extra UV sets nobody samples.
  for (const mesh of root.listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      for (const sem of prim.listSemantics()) {
        if (/^TEXCOORD_[1-9]$/.test(sem)) prim.setAttribute(sem, null);
      }
    }
  }

  const transforms = [dedup(), prune(), weld()];
  if (m.ratio < 1) transforms.push(simplify({ simplifier: MeshoptSimplifier, ratio: m.ratio, error: m.error }));
  transforms.push(
    resample(),
    prune(),
    textureCompress({ encoder: sharp, targetFormat: "webp", resize: [m.textureSize, m.textureSize], quality: 82 }),
  );
  await doc.transform(...transforms);
  // Keep named nodes (wheels, dump box) so they can be animated; only compress geometry.
  await doc.transform(meshopt({ encoder: MeshoptEncoder, level: "medium" }));
  doc.createExtension(EXTMeshoptCompression).setRequired(true);

  const out = `${OUT}/${m.name}.glb`;
  await io.write(out, doc);
  const before = (await stat(`${SRC}/${m.name}.glb`)).size;
  const after = (await stat(out)).size;
  let tris = 0;
  for (const mesh of root.listMeshes())
    for (const p of mesh.listPrimitives()) tris += (p.getIndices()?.getCount() ?? 0) / 3;
  console.log(`${m.name.padEnd(12)} ${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(2)} MB  (${Math.round(tris)} tris)`);
}
