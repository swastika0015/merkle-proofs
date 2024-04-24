const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

// list of email addresses to whitelist
let emailAddresses = [
    "test1@gmail.com",
    "test2@gmail.com",
    "test3@gmail.com",
];

// hash email addresses to get the leaves
let leaves = emailAddresses.map(email => keccak256(email));

// create Merkle Tree
let merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });

// get root hash
let rootHash = merkleTree.getRoot().toString('hex');

// print the Merkle Tree structure
// console.log(merkleTree.toString());

// testing to whitelist 3 email addresses
let valuesToCheck = [
    "test1@gmail.com",
    "test2@gmail.com",
    "test3@gmail.com",
];

// verifying with Merkle proof
valuesToCheck.forEach( (value => {
    let hashedEmail = keccak256(value);
    let proof = merkleTree.getHexProof(hashedEmail);
    console.log(proof);
    let isWhitelisted = merkleTree.verify(proof, hashedEmail, rootHash);
    console.log(isWhitelisted); // returns true or false
}) );


