import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import fs from "fs";
import idl from "../anchor/target/idl/anchor.json";

async function main() {
  // Connect to devnet
  const connection = new Connection(clusterApiUrl("devnet"));

  // Your program ID
  const programId = new PublicKey(
    "ZgPzcHgQj2oJ6V69Mvm3GQYhnb3Ui5ESGwqPX2bXt45"
  );

  const wallet = Keypair.fromSecretKey(
    new Uint8Array(
      JSON.parse(
        fs.readFileSync(
          `${process.env.HOME}/.config/solana/id_new.json`,
          "utf-8"
        )
      )
    )
  );

  // Setup provider
  const anchorWallet = new anchor.Wallet(wallet);
  const provider = new anchor.AnchorProvider(connection, anchorWallet, {});

  const program = new anchor.Program(
    idl as unknown as anchor.Idl,
    programId,
    provider
  );

  // Call the 'initialize' instruction
  const tx = await program.methods.initialize().rpc();

  console.log("Transaction signature:", tx);

  // You should see your "Greetings from" message in the transaction logs
}

main().catch(console.error);
