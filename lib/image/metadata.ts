import { Sharp } from "sharp";

export function applyMetadataHandling(instance: Sharp, stripMetadata: boolean): Sharp {
  if (stripMetadata) {
    // Sharp strips by default unless withMetadata is called.
    return instance;
  }
  return instance.withMetadata();
}
