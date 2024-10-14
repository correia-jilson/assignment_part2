FROM rust:latest

WORKDIR /usr/src/bitcoin_explorer
COPY . .

RUN cargo build --release
CMD ["./target/release/ingestion"]
