/** Appended to image URLs so a phone (or CDN) that cached an older/missing response fetches the current file after each deploy. */
export const ASSET_V = process.env.NEXT_PUBLIC_ASSET_V ?? "dev";
export const asset = (path: string) => `${path}?v=${ASSET_V}`;
