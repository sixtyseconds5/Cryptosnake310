import { ready, authenticate } from "@farcaster/sdk";

export async function initFarcaster() {
  await ready();
  const user = await authenticate();
  return user; // user.fid => Farcaster ID unik
}
