import {
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  Keypair,
  Connection,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";
import fs from "fs";

const main = async () => {
  const connection = new Connection(clusterApiUrl("devnet"));

  // example of losing all money from network fees (transferring back and forth between 2 accounts)

  console.log("starting wasteful tx's");
  for (let i = 0; i < 1000; i++) {
    console.log(
      `tx: ${i}: sender ${
        i % 2 === 0
          ? "wallet1, receiver: wallet 2"
          : "wallet2, receiver: wallet 1"
      }`
    );
    const wallet1 = Keypair.fromSecretKey(
      new Uint8Array(
        JSON.parse(
          fs.readFileSync(
            `${process.env.HOME}/.config/solana/id_new.json`,
            "utf-8"
          )
        )
      )
    );
    const wallet2 = Keypair.fromSecretKey(
      new Uint8Array(
        JSON.parse(
          fs.readFileSync(`${process.env.HOME}/.config/solana/id.json`, "utf-8")
        )
      )
    );

    let transferInstruction;
    let sender;
    let receiver;
    if (i % 2 === 0) {
      sender = wallet1;
      receiver = wallet2;
    } else {
      sender = wallet2;
      receiver = wallet1;
    }

    const SOL = 0.001;

    transferInstruction = SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: receiver.publicKey,
      lamports: SOL * LAMPORTS_PER_SOL,
    });

    const transaction = new Transaction().add(transferInstruction);

    const transactionSignature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [sender]
    );

    console.log(
      "Transaction Signature:",
      `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
    );
  }
};

main();
