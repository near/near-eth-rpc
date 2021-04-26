/* This is free and unencumbered software released into the public domain. */
import { SkeletonServer } from './skeleton.js';
import { unimplemented } from '../errors.js';
import { Address, formatU256, hexToBase58, hexToBytes, intToHex } from '@aurora-is-near/engine';
export class EphemeralServer extends SkeletonServer {
    constructor() {
        super(...arguments);
        this.filters = new Map();
        this.filterID = 0;
        this.latestBlockID = 0;
    }
    async _init() {
        this.latestBlockID = parseInt(await this.eth_blockNumber(), 16);
    }
    async eth_accounts() {
        return (await this.engine.keyStore.getSigningAddresses()).map(a => a.toString());
    }
    async eth_blockNumber() {
        const height = (await this.engine.getBlockHeight()).unwrap();
        return `0x${height.toString(16)}`;
    }
    async eth_call(transaction, blockNumber) {
        return await this.provider.routeRPC('eth_call', [transaction, blockNumber]); // TODO
    }
    async eth_chainId() {
        const chainID = (await this.engine.getChainID()).unwrap();
        return `0x${chainID.toString(16)}`;
    }
    async eth_coinbase() {
        return (await this.engine.getCoinbase()).unwrap().toString();
    }
    async eth_getBalance(address, blockNumber) {
        const address_ = Address.parse(address).unwrap();
        const balance = (await this.engine.getBalance(address_)).unwrap();
        return `0x${balance.toString(16)}`;
    }
    async eth_getBlockByHash(blockHash, fullObject) {
        const blockHash_ = blockHash.startsWith('0x') ? hexToBase58(blockHash) : blockHash;
        const options = {
            contractID: this.engine.contractID,
            transactions: fullObject ? 'full' : 'id',
        };
        const result = await this.engine.getBlock(blockHash_, options);
        if (result.isErr())
            return null;
        const block = result.unwrap();
        const response = block.toJSON();
        if (fullObject) {
            response.transactions.forEach((tx, i) => {
                tx.blockHash = block.hash;
                tx.blockNumber = intToHex(block.number);
                tx.transactionIndex = intToHex(i);
            });
        }
        return response;
    }
    async eth_getBlockByNumber(blockNumber, fullObject) {
        const blockNumber_ = blockNumber.startsWith('0x') ? parseInt(blockNumber, 16) : blockNumber;
        const options = {
            contractID: this.engine.contractID,
            transactions: fullObject ? 'full' : 'id',
        };
        const result = await this.engine.getBlock(blockNumber_, options);
        if (result.isErr())
            return null;
        const block = result.unwrap();
        const response = block.toJSON();
        if (fullObject) {
            response.transactions.forEach((tx, i) => {
                tx.blockHash = block.hash;
                tx.blockNumber = intToHex(block.number);
                tx.transactionIndex = intToHex(i);
            });
        }
        return response;
    }
    async eth_getBlockTransactionCountByHash(blockHash) {
        const blockHash_ = blockHash.startsWith('0x') ? hexToBase58(blockHash) : blockHash;
        const result = await this.engine.getBlockTransactionCount(blockHash_);
        if (result.isErr())
            return null;
        return `0x${result.unwrap().toString(16)}`;
    }
    async eth_getBlockTransactionCountByNumber(blockNumber) {
        const blockNumber_ = blockNumber.startsWith('0x') ? parseInt(blockNumber, 16) : blockNumber;
        const result = await this.engine.getBlockTransactionCount(blockNumber_);
        if (result.isErr())
            return null;
        return `0x${result.unwrap().toString(16)}`;
    }
    async eth_getCode(address, _blockNumber) {
        const address_ = Address.parse(address).unwrap();
        const code = (await this.engine.getCode(address_)).unwrap();
        return `0x${Buffer.from(code).toString('hex')}`;
    }
    async eth_getFilterChanges(filterID) {
        const filterID_ = parseInt(filterID, 16);
        if (filterID_ === 0) {
            return [];
        }
        unimplemented('eth_getFilterChanges'); // TODO
        return [];
    }
    async eth_getFilterLogs(filterID) {
        const filterID_ = parseInt(filterID, 16);
        if (filterID_ === 0) {
            return [];
        }
        unimplemented('eth_getFilterLogs'); // TODO
        return [];
    }
    async eth_getLogs(_filter) {
        unimplemented('eth_getLogs'); // TODO
        return [];
    }
    async eth_getStorageAt(address, key, blockNumber) {
        const address_ = Address.parse(address).unwrap();
        const result = (await this.engine.getStorageAt(address_, key)).unwrap();
        return formatU256(result);
    }
    async eth_getTransactionByBlockHashAndIndex(blockHash, transactionIndex) {
        const blockHash_ = blockHash.startsWith('0x') ? hexToBase58(blockHash) : blockHash;
        const transactionIndex_ = parseInt(transactionIndex, 16);
        const options = {
            contractID: this.engine.contractID,
            transactions: 'full',
        };
        const result = await this.engine.getBlock(blockHash_, options);
        if (result.isErr())
            return null;
        const block = result.unwrap();
        let transaction = block.toJSON().transactions[transactionIndex_];
        if (transaction) {
            transaction = Object.assign(transaction, {
                blockHash: block.hash,
                blockNumber: intToHex(block.number),
                transactionIndex: intToHex(transactionIndex_),
            });
        }
        return transaction || null;
    }
    async eth_getTransactionByBlockNumberAndIndex(blockNumber, transactionIndex) {
        const blockNumber_ = blockNumber.startsWith('0x') ? parseInt(blockNumber, 16) : blockNumber;
        const transactionIndex_ = parseInt(transactionIndex, 16);
        const options = {
            contractID: this.engine.contractID,
            transactions: 'full',
        };
        const result = await this.engine.getBlock(blockNumber_, options);
        if (result.isErr())
            return null;
        const block = result.unwrap();
        let transaction = block.toJSON().transactions[transactionIndex_];
        if (transaction) {
            transaction = Object.assign(transaction, {
                blockHash: block.hash,
                blockNumber: intToHex(block.number),
                transactionIndex: intToHex(transactionIndex_),
            });
        }
        return transaction || null;
    }
    async eth_getTransactionByHash(transactionHash) {
        const transactionHash_ = hexToBytes(transactionHash);
        console.debug(transactionHash_); // TODO
        return await this.provider.routeRPC('eth_getTransactionByHash', [transactionHash]); // TODO
    }
    async eth_getTransactionCount(address, _blockNumber) {
        //const [address] = expectArgs(params, 1, 2, "cannot request transaction count without specifying address");
        const address_ = Address.parse(address).unwrap();
        const nonce = (await this.engine.getNonce(address_)).unwrap();
        return `0x${nonce.toString(16)}`;
    }
    async eth_getTransactionReceipt(transactionHash) {
        return await this.provider.routeRPC('eth_getapi.TransactionReceipt', [transactionHash]); // TODO
    }
    async eth_getUncleCountByBlockHash(blockHash) {
        const blockHash_ = blockHash.startsWith('0x') ? hexToBase58(blockHash) : blockHash;
        const result = await this.engine.hasBlock(blockHash_);
        return result && result.isOk() ? '0x0' : null;
    }
    async eth_getUncleCountByBlockNumber(blockNumber) {
        const blockNumber_ = blockNumber.startsWith('0x') ? parseInt(blockNumber, 16) : blockNumber;
        const result = await this.engine.hasBlock(blockNumber_);
        return result && result.isOk() ? '0x0' : null;
    }
    async eth_newBlockFilter() {
        const id = ++this.filterID;
        this.filters.set(id, { blockID: this.latestBlockID });
        return intToHex(id);
    }
    async eth_newFilter(_filter) {
        unimplemented('eth_newFilter'); // TODO
        return `0x0`;
    }
    async eth_newPendingTransactionFilter() {
        return '0x0'; // designates the empty filter
    }
    async eth_sendRawTransaction(transaction) {
        const output = (await this.engine.rawCall(transaction)).unwrap();
        return `0x${output ? Buffer.from(output).toString('hex') : ''}`;
    }
    async eth_sendTransaction(transaction) {
        return await this.provider.routeRPC('eth_sendTransaction', [transaction]); // TODO
    }
    async eth_sign(_account, _message) {
        unimplemented('eth_sign'); // TODO
        return `0x`;
    }
    async eth_signTransaction(_transaction) {
        unimplemented('eth_signTransaction'); // TODO
        return `0x`;
    }
    async eth_signTypedData(_address, _data) {
        unimplemented('eth_signTypedData'); // TODO
        return `0x`;
    }
    async eth_uninstallFilter(filterID) {
        const filterID_ = parseInt(filterID, 16);
        if (filterID_ === 0) {
            return true;
        }
        unimplemented('eth_uninstallFilter'); // TODO
        return false;
    }
}