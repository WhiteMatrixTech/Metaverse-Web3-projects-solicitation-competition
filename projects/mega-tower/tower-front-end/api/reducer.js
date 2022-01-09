const reducer = (state, action) => {
    switch (action.type) {
        //web3Instance
        case 'CONNECT_INIT':
            return { ...state, web3InstanceState: 'CONNECT_INIT' };

        case 'CONNECT':
            return { ...state, web3Instance: action.payload, web3InstanceState: 'READY' };

        case 'CONNECT_ERROR':
            return { ...state, web3InstanceState: 'ERROR', web3InstanceError: action.payload };


        //accounts
        case 'LOAD_ALLACCOUNT':
            return { ...state, accountState: 'LOAD_ALLACCOUNTS', Account:null};

        case 'SET_ALLACCOUNT':
            return { ...state, Account: action.payload, accountState: 'READY' };

        case 'ALLACCOUNT_ERROR':
            return { ...state, Account: null, accountState: 'ERROR' };




        default:
            throw new Error(`Unknown type: ${action.type}`);
    }
};
export default reducer
