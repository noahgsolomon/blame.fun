use anchor_lang::prelude::*;

declare_id!("ZgPzcHgQj2oJ6V69Mvm3GQYhnb3Ui5ESGwqPX2bXt45");

#[program]
pub mod anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
