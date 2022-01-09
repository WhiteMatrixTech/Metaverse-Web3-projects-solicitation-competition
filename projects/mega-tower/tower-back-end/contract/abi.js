module.exports = [
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "width_",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "height_",
                "type": "uint16"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "invitee",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "inviter",
                "type": "address"
            }
        ],
        "name": "DoInvition",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint16",
                "name": "xAxis",
                "type": "uint16"
            },
            {
                "indexed": true,
                "internalType": "uint16",
                "name": "yAxis",
                "type": "uint16"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "r",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "g",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "b",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "count",
                "type": "uint64"
            }
        ],
        "name": "DoPixel",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "end",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "xAxis_",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "yAxis_",
                "type": "uint16"
            }
        ],
        "name": "getPixel",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "getShares",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "height",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "xAxis_",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "yAxis_",
                "type": "uint16"
            },
            {
                "internalType": "uint8",
                "name": "r_",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "g_",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "b_",
                "type": "uint8"
            }
        ],
        "name": "setPixel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "xAxis_",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "yAxis_",
                "type": "uint16"
            },
            {
                "internalType": "uint8",
                "name": "r_",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "g_",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "b_",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "inviter",
                "type": "address"
            }
        ],
        "name": "setPixel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "start",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "status",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "width",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
