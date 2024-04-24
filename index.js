const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

// List of email addresses to whitelist
let emailAddresses = [
    "test1@gmail.com",
    "test2@gmail.com",
    "test3@gmail.com",
];

// Hash email addresses to get the leaves
let leaves = emailAddresses.map(email => keccak256(email));

// Create Merkle Tree
let merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });

// Get root hash
let rootHash = merkleTree.getRoot().toString('hex');

console.log('Root hash:', rootHash);

// Pretty-print the Merkle Tree structure
console.log(merkleTree.toString());

let valuesToCheck = [
    "test1@gmail.com",
    "test2@gmail.com",
    "test3@gmail.com",
];
valuesToCheck.forEach( (value => {
    let hashedEmail = keccak256(value);
    let proof = merkleTree.getHexProof(hashedEmail);
    let isWhitelisted = merkleTree.verify(proof, hashedEmail, rootHash);
    console.log(isWhitelisted); // Returns true or false
}) );


