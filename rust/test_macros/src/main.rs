use anchor_like_macros::*;
use serde::{Serialize, Deserialize};

#[account]
#[derive(Debug)]
pub struct Account {
    pub user: String,
    pub balance: u64,
    pub bump: u8
}

declare_id!("ZgPzcHgQj2oJ6V69Mvm3GQYhnb3Ui5ESGwqPX2bXt451");

fn main() {
    let account = Account{
        user: "Alice".to_string(),
        balance: 1000,
        bump: 1
    };

    println!("PROGRAM_ID: {}", PROGRAM_ID);

    match account.validate() {
        Ok(_) => println!("Account is valid."),
        Err(e) => println!("Account validation failed: {}", e)
    };

    let serialized = serde_json::to_string(&account).unwrap();
    println!("Serialized: {}", serialized);

    let deserialized: Account = serde_json::from_str(&serialized).unwrap();
    println!("Deserialized: {:?}", deserialized);
}