import {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import fs from "fs";

const main = async () => {
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

  const connection = new Connection(clusterApiUrl("devnet"));

  const mint = new Keypair();

  const rentLamports = await getMinimumBalanceForRentExemptMint(connection);

  const createAccountInstruction = SystemProgram.createAccount({
    fromPubkey: wallet.publicKey,
    newAccountPubkey: mint.publicKey,
    space: MINT_SIZE,
    lamports: rentLamports,
    programId: TOKEN_2022_PROGRAM_ID,
  });

  const initializeMintInstruction = createInitializeMint2Instruction(
    mint.publicKey,
    2,
    wallet.publicKey,
    wallet.publicKey,
    TOKEN_2022_PROGRAM_ID
  );

  const transaction = new Transaction().add(
    createAccountInstruction,
    initializeMintInstruction
  );

  const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [wallet, mint]
  );

  console.log(
    "\nTransaction Signature: ",
    `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  );
};

main();
