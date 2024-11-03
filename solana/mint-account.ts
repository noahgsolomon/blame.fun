import { getMint, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

const main = async () => {
  const connection = new Connection(clusterApiUrl("devnet"));

  const address = new PublicKey("C33qt1dZGZSsqTrHdtLKXPZNoxs6U1ZBfyDkzmj6mXeR");

  const accountInfo = await connection.getAccountInfo(address);

  console.log(JSON.stringify(accountInfo, null, 2));

  const mintData = await getMint(
    connection,
    address,
    "confirmed",
    TOKEN_2022_PROGRAM_ID
  );

  console.log(mintData);
};

main().catch(console.error);
