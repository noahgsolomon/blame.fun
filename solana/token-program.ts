import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const main = async () => {
  const connection = new Connection(clusterApiUrl("devnet"));

  const address = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

  const accountInfo = await connection.getAccountInfo(address);

  console.log(JSON.stringify(accountInfo, null, 2));
};

main().catch(console.error);
