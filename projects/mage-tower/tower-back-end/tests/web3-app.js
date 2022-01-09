const {ethers} = require("ethers");
const abi = require("../contract/abi");

const contractAddress = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1";

// const provider = new ethers.providers.WebSocketProvider("http://localhost:8545");
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

let contract = new ethers.Contract(contractAddress, abi, provider);
contract.on("DoPixel", (operator, x, y, r, g, b, count) => {
    // const hex = Pixel.getHexFromRGB(r, g, b);
    console.log(operator, x, y, r, g, b, count);
    contract.getShares(operator).then((value) => {
        console.log(value);
    });
    // paint(operator, x, y, hex, count, shares);
});