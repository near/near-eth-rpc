import * as api from '../api.js';
import { Config } from '../config.js';
import { NearProvider } from '../provider.js';
import { Engine } from '@aurora-is-near/engine';
import { Logger } from 'pino';
export declare abstract class SkeletonServer implements api.Service {
    readonly config: Config;
    readonly logger: Logger;
    readonly engine: Engine;
    readonly provider: NearProvider;
    constructor(config: Config, logger: Logger, engine: Engine, provider: NearProvider);
    abstract _init(): Promise<void>;
    web3_clientVersion(): Promise<string>;
    web3_sha3(input: api.Data): Promise<api.Data>;
    net_listening(): Promise<boolean>;
    net_peerCount(): Promise<api.Quantity>;
    net_version(): Promise<string>;
    eth_accounts(): Promise<api.Data[]>;
    eth_blockNumber(): Promise<api.Quantity>;
    eth_call(_transaction: api.TransactionForCall, _blockNumber?: api.Quantity | api.Tag): Promise<api.Data>;
    eth_chainId(): Promise<api.Quantity>;
    eth_coinbase(): Promise<api.Data>;
    eth_compileLLL(_code: string): Promise<api.Data>;
    eth_compileSerpent(_code: string): Promise<api.Data>;
    eth_compileSolidity(_code: string): Promise<api.Data>;
    eth_estimateGas(_transaction: api.TransactionForCall, _blockNumber?: api.Quantity | api.Tag): Promise<api.Quantity>;
    eth_gasPrice(): Promise<api.Quantity>;
    eth_getBalance(_address: api.Data, _blockNumber?: api.Quantity | api.Tag): Promise<api.Quantity>;
    eth_getBlockByHash(_blockHash: api.Data, _fullObject?: boolean): Promise<api.BlockResult | null>;
    eth_getBlockByNumber(_blockNumber: api.Quantity | api.Tag, _fullObject?: boolean): Promise<api.BlockResult | null>;
    eth_getBlockTransactionCountByHash(_blockHash: api.Data): Promise<api.Quantity | null>;
    eth_getBlockTransactionCountByNumber(_blockNumber: api.Quantity | api.Tag): Promise<api.Quantity | null>;
    eth_getCode(_address: api.Data, _blockNumber: api.Quantity | api.Tag): Promise<api.Data>;
    eth_getCompilers(): Promise<string[]>;
    eth_getFilterChanges(_filterID: api.Quantity): Promise<api.LogObject[]>;
    eth_getFilterLogs(_filterID: api.Quantity): Promise<api.LogObject[]>;
    eth_getLogs(_filter: api.FilterOptions): Promise<api.LogObject[]>;
    eth_getProof(_address: api.Data, _keys: api.Data[], _blockNumber: api.Quantity | api.Tag): Promise<api.ProofResult>;
    eth_getStorageAt(_address: api.Data, _key: api.Quantity, _blockNumber: api.Quantity | api.Tag): Promise<api.Data>;
    eth_getTransactionByBlockHashAndIndex(_blockHash: api.Data, _transactionIndex: api.Quantity): Promise<api.TransactionResult | null>;
    eth_getTransactionByBlockNumberAndIndex(_blockNumber: api.Quantity | api.Tag, _transactionIndex: api.Quantity): Promise<api.TransactionResult | null>;
    eth_getTransactionByHash(_transactionHash: api.Data): Promise<api.TransactionResult | null>;
    eth_getTransactionCount(_address: api.Data, _blockNumber: api.Quantity | api.Tag): Promise<api.Quantity>;
    eth_getTransactionReceipt(_transactionHash: string): Promise<api.TransactionReceipt | null>;
    eth_getUncleByBlockHashAndIndex(_blockHash: api.Data, _uncleIndex: api.Quantity): Promise<api.BlockResult | null>;
    eth_getUncleByBlockNumberAndIndex(_blockNumber: api.Quantity | api.Tag, _uncleIndex: api.Quantity): Promise<api.BlockResult | null>;
    eth_getUncleCountByBlockHash(_blockHash: api.Data): Promise<api.Quantity | null>;
    eth_getUncleCountByBlockNumber(_blockNumber: api.Quantity | api.Tag): Promise<api.Quantity | null>;
    eth_getWork(): Promise<api.Data[]>;
    eth_hashrate(): Promise<api.Quantity>;
    eth_mining(): Promise<false>;
    eth_newBlockFilter(): Promise<api.Quantity>;
    eth_newFilter(_filter: api.FilterOptions): Promise<api.Quantity>;
    eth_newPendingTransactionFilter(): Promise<api.Quantity>;
    eth_pendingTransactions(): Promise<Record<string, string | number | null>[]>;
    eth_protocolVersion(): Promise<string>;
    eth_sendRawTransaction(_transaction: api.Data): Promise<api.Data>;
    eth_sendTransaction(_transaction: api.TransactionForSend): Promise<api.Data>;
    eth_sign(_account: api.Data, _message: api.Data): Promise<api.Data>;
    eth_signTransaction(_transaction: api.TransactionForSend): Promise<api.Data>;
    eth_signTypedData(_address: api.Data, _data: api.TypedData): Promise<api.Data>;
    eth_submitHashrate(_hashrate: api.Quantity, _clientID: api.Quantity): Promise<false>;
    eth_submitWork(_nonce: api.Data, _powHash: api.Data, _mixDigest: api.Data): Promise<false>;
    eth_syncing(): Promise<false>;
    eth_uninstallFilter(_filterID: api.Quantity): Promise<boolean>;
}