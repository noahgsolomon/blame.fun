// represents a seq of tokens. smallest meaningful unit of rust code. these are the seq of lexical tokens.
// procedural macros can manipulate thse tokens to generate new code
// when u apply a macro (e.g., #[account]), the code it's applied to like a struct definition is passed to the macro as a TokenStream. the macro receives this as input and can parse it to understand the structure of the code.

// now we can manipulate this tokenstream and return a *new* TokenStream, which is the new seq of tokens for the code that macro was applied to.

// macros are token mapping functions mapping one seq of tokens, to another different seq of tokens, fundamentally
use proc_macro::TokenStream;

// let's us write rust code as a template, and converts it into a TokenStream for us.
use quote::quote;

// parse_macro_input: when a macro receives input as a TokenStream, it's just raw tokens, so we need ot parse it to understand the structure
// DeriveInput: data structure that represents a rust item to which a #[derive] macro might be applied
// if ur writing a custom #[derive] macro like #[derive(Account)], you expect that input to be a Rust item that can have #[derive] applied to it, typically a struct, enum, or union.
// DeriveInput is th data structure designed to represent these items. it holds info about the item's type (e.g., struct or enum), name, fields, attributes, generics, etc.
// when u use parse_mavro_input!(input as DeriveInput), ur converting the raw TokenStream input a DeriveInput struct that makes it ez to inspect and work w/ the parrsed item in the macro
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_attribute]
pub fn account(_attr: TokenStream, item: TokenStream) -> TokenStream {
    // parse the input tokens into a syntax tree (a struct def in this case)
    let input = parse_macro_input!(item as DeriveInput);

    // get struct's name to use it in generated code
    // clone the struct's name to use it in generated code w/o moving "input"
    let name = input.ident.clone();

    let expanded = quote! {
        // derive the serialize and deserialize traits
        #[derive(Serialize, Deserialize)]
        // basically expanding the data structure that someone used this procedural macro in. Like we're saying derive serialize and deserialize but keep all they had below it.
        #input

        // #name is syntax for inserting variable's value into the generated code
        impl #name {
            // Implement a basic validationmethod
            pub fn validate(&self) -> Result<(), &'static str> {
                if self.bump == 0 {
                    return Err("Invalid account: bump must be non-zero")
                }
                Ok(())
            }
        }
    };

    TokenStream::from(expanded)
}

/*
example:

#[account]
pub struct MyAccount {
    pub user: Pubkey,
    pub balance: u64,
    pub bump: u8,
}

is transformed into

// Original struct definition with the injected `Serialize` and `Deserialize` traits
#[derive(Serialize, Deserialize)]
pub struct MyAccount {
    pub user: Pubkey,
    pub balance: u64,
    pub bump: u8,
}

// Injected implementation block with the `validate` method
impl MyAccount {
    pub fn validate(&self) -> Result<(), &'static str> {
        // Basic validation: check that `bump` is non-zero
        if self.bump == 0 {
            return Err("Invalid account: bump must be non-zero");
        }
        Ok(())
    }
}

and there is then a secondary transformation from the Serialize and Deserialize proc macros.

maybe would expand to include something like

impl Serialize for MyAccount {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        // Generated code to serialize each field: `user`, `balance`, and `bump`
    }
}

impl<'de> Deserialize<'de> for MyAccount {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        // Generated code to deserialize each field: `user`, `balance`, and `bump`
    }
}

so using the serialize and deserialize custom derive macros essentially is giving us access to generic fn's deserialize and serialize basically

"hey! this struct should have access to a validate fn, a serialize fn, and a deserialize fn, is basically what adding the custom derived account procedural macro is doing in one line of code"

*/