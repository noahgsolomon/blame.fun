import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Pda } from "../target/types/pda";
import { PublicKey } from "@solana/web3.js";

// describe("anchor", () => {
// Configure the client to use the local cluster.
// anchor.setProvider(anchor.AnchorProvider.env());

// const program = anchor.workspace.Anchor as Program<Pda>;

// it("Is initialized!", async () => {
//   // Add your test here.
//   const tx = await program.methods.initialize().rpc();
//   console.log("Your transaction signature", tx);
// });
// });

describe("pda", () => {
  const connection = new anchor.web3.Connection(
    "https://api.devnet.solana.com",
    {
      commitment: "confirmed",
      confirmTransactionInitialTimeout: 180000,
      wsEndpoint: "wss://api.devnet.solana.com/",
    }
  );

  const provider = new anchor.AnchorProvider(
    connection,
    anchor.AnchorProvider.env().wallet,
    {
      commitment: "confirmed",
      preflightCommitment: "confirmed",
      skipPreflight: true,
    }
  );
  anchor.setProvider(provider);

  const program = anchor.workspace.Pda as Program<Pda>;
  const wallet = provider.wallet;

  const timestamp = new Date().getTime().toString();
  const [messagePda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("message"),
      wallet.publicKey.toBuffer(),
      Buffer.from(timestamp),
    ],
    program.programId
  );

  it("Create Message Account", async () => {
    const message = "WE ARE SO BACK!!!";
    const transactionSignature = await program.methods
      .create(message, timestamp)
      .accounts({
        messageAccount: messagePda,
        user: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc({ commitment: "confirmed" });

    const messageAccount = await program.account.messageAccount.fetch(
      messagePda,
      "confirmed"
    );

    console.log(JSON.stringify(messageAccount, null, 2));
    console.log(
      "Transaction Signature:",
      `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
  });

  it("Update Message Account", async () => {});

  it("Delete Message Account", async () => {});
});
