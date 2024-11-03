import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

async function main() {
  // Create connection to devnet
  const connection = new Connection(clusterApiUrl("mainnet-beta"));

  // Example 1: Fetch any account info
  const address = new PublicKey("DZDqinTue4S3ZqvfSmh4P2AqiWM7wM4KVofiuMXgMrWx");
  const accountInfo = await connection.getAccountInfo(address);

  console.log(JSON.stringify(accountInfo, null, 2));
}

main().catch(console.error);
