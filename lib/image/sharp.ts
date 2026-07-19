import sharp, { Sharp } from "sharp";

export function initializeSharp(buffer: Buffer): Sharp {
  return sharp(buffer);
}

export async function getMetadata(buffer: Buffer) {
  return await sharp(buffer).metadata();
}
