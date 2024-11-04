use anchor_lang::prelude::*;

// basically setting PROGRAM_ID to the input we pass,
// but the nice thing about using a procedural function-like macro
// is that we can bundle all declaration and validation logic together.
// for example, declare_id macro might have a check in the macro to
// make sure that this id is valid or not.

// this is where our code lives. it's just a regular Ed25519 public key. We depoloy our smart contract to this address. "The address of the program itself"
// PROGRAM ID

// We're u-ploading code which is accessible from our program id. and our program is making messages from a givrn user. the message transactions are children of users and this program basically.
declare_id!("3GSKMxL6kyijtC3YjLs64EkU9uuDkcNDJqvUSfAaURX4");

/*
Program (at Program ID: ZgPzcHg...)
│
└── User1's Message (at PDA derived from ["message", User1_pubkey])
│   └── Data: { user: User1_pubkey, message: "Hello", bump: 255 }
│
└── User2's Message (at PDA derived from ["message", User2_pubkey])
    └── Data: { user: User2_pubkey, message: "World", bump: 254 } 
*/

#[program]
pub mod pda {
    use super::*;

    // logic for initializing a new message account's data. takes 2 params:
    // - ctx provides access to the accounts specified in the create struct
    // - message the user's message to be stored
    pub fn create(ctx: Context<Create>, message: String, timestamp: String) -> Result<()> {
        // prints msg to program logs
        msg!("Create Message: {}", message);
        let account_data = &mut ctx.accounts.message_account;
        account_data.user = ctx.accounts.user.key();
        account_data.message = message;
        account_data.bump = ctx.bumps.message_account;
        Ok(())
    }

    pub fn update(ctx: Context<Update>, message: String) -> Result<()> {
        msg!("Update Message: {}", message);
        let account_data = &mut ctx.accounts.message_account;
        account_data.message = message;
        Ok(())
    }

    pub fn delete(_ctx: Context<Delete>) -> Result<()> {
        // we don't need to add any additional logic bc the 'close' constraint is handling the xlosing of the account in the Delete struct
        msg!("Delete Message");
        Ok(())
    }
}

//derive attribute: built in rust attribute that injects the data structure field into the data structure that calls that attribute
// annotates structs that represent a list of accounts required by an instruction where each field in the struct is an account

#[derive(Accounts)]
#[instruction(message: String, timestamp: String)]
// create struct defines the accounts required for the create instruction
pub struct Create<'info> {
    #[account(mut)]
    // represents the user creating the message account
    // marked as mutable bc it pays for the new account (lamport field needs to be updated)
    // must be a signer to approve the transaction, as lamports are deducted from account
    pub user: Signer<'info>,

    #[account(
    // init constraint indicates the account will be created in the instruction
        init,
        // seeds and bump constraint indicate the address of the account is a program derived address (PDA)
        seeds = [b"message", user.key().as_ref(), timestamp.as_ref()],
        // ok so let's motivate the bump. we have a program id. and in that program, transactions are made like message transactions (accounts). it is possible the resulting PDA hash is a valid Ed25519 point. We don't want this because it invites a possible user address (publicKey) collision. So we add a bump into our SHA256 hash as a fn parameter.
        /*
        here is example:

        {
            ...
            seeds = ...
            program_id = ...
            for bump in (0..=255).rev() {
                address = sha256(seeds || program_id || bump);
                if !is_valid_ed25519_point(address) {
                    return (address, bump);
                }
            }
            panic!("unable to find invalid point");
        }
         */
        bump,
        // specifies the account paying for the creation of the new account
        payer = user,
        // number of bytes allocated to the new account's data field
        // for MessageAccount data type:
        // anchor account discriminator: 8 bytes
        // user address (Pubkey): 32 bytes
        // user msg (String): 4 bytes for length (to store length of string) + variable message length
        // PDA Bump seed (u8): 1 byte
        space = 8 + 32 + 4 + message.len() + 1
    )]
    // new account created to store user's msg
    pub message_account: Account<'info, MessageAccount>,
    
    pub system_program: Program<'info, System>
}

// defines accounts required for the update instruction
#[derive(Accounts)]
#[instruction(message: String)]
pub struct Update<'info> {
    // user updating the message account
    // mutable bc it may pay for additional space for the message_account if needed
    #[account(mut)]
    pub user: Signer<'info>,

    // existing account storing the user's message that will be updated
    // mut constraint indicates this account's data will be changed
    // realloc constraint allows for resizing the account's data
    // seeds and bump constraints ensure the account is the correct program derived address
    #[account( 
        mut,
        seeds = [b"message", user.key().as_ref()],
        // we already figured out the bump that is valid when creating the message, so no need in having anchor recalculate it
        bump = message_account.bump,
        realloc = 8 + 32 + 4 + message.len() + 1,
        realloc::payer = user,
        realloc::zero = true,
    )]
    pub message_account: Account<'info, MessageAccount>,
    // required for potential reallocation of account space.
    // the realloc constraint invokes the system program to adjust the account's data size
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Delete<'info> {
    // user closing msg account
    // marked as mutable as it will receive lamports from the closed account
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut, seeds = [b"message", user.key().as_ref()],
        bump = message_account.bump,
        // indicates who is closing account and will be receiving the lamports
        close = user
    )]
    pub message_account: Account<'info, MessageAccount>
}

// macro in anchor used to annotate structs that represent account data (data type to store in the AccountInfo's 'data' field)

// when an account is created, the MessageAccount data will be serialized and stored in the new account's data field

// later when reading from the account this message account data stored in the account info's 'data' field can be deserialized back into the MessageAccount data type described below.
#[account]
pub struct MessageAccount {
    pub user: Pubkey,
    pub message: String,
    pub bump: u8
}

// Program needs to store data at deterministic addresses
// But these addresses must be controlled ONLY by the program
// Not by any user's private key