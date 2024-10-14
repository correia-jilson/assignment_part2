extern crate bitcoincore_rpc;
extern crate postgres;

use bitcoincore_rpc::{Auth, Client, RpcApi};
use postgres::{Client as PgClient, NoTls};
use std::thread;
use std::time::Duration;

fn main() {
    // Create the Bitcoin RPC client
    let rpc = Client::new("http://localhost:8332",
                          Auth::UserPass("<FILL RPC USERNAME>".to_string(),
                                         "<FILL RPC PASSWORD>".to_string())).unwrap();

    // Connect to the PostgreSQL database
    let mut pg_client = PgClient::connect("host=postgres user=youruser password=yourpassword dbname=bitcoin_explorer", NoTls).unwrap();

    // Simple loop to fetch the block height and insert into the database
    loop {
        // Fetch the best block hash from the Bitcoin node
        let best_block_hash = rpc.get_best_block_hash().unwrap();
        println!("best block hash: {}", best_block_hash);

        // Fetch the block information using the block hash
        let block_info = rpc.get_block_info(&best_block_hash).unwrap();
        let block_height = block_info.height as i64;  // Convert block_height to i64
        println!("block height: {}", block_height);

        // Insert block height into the PostgreSQL database
        pg_client.execute(
            "INSERT INTO block_data (block_height) VALUES ($1)",
            &[&block_height]  // Use block_height as i64
        ).unwrap();

        // Sleep for a specified time before fetching the next block (e.g., 60 seconds)
        thread::sleep(Duration::from_secs(60));
    }
}
