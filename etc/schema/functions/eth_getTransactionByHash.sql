DROP FUNCTION IF EXISTS eth_getTransactionByHash(hash) RESTRICT;

CREATE FUNCTION eth_getTransactionByHash(transaction_hash hash) RETURNS transaction_result AS $$
DECLARE
  result transaction_result;
BEGIN
  SELECT
      b.id,                         -- blockNumber
      b.hash,                       -- blockHash
      0,                            -- transactionIndex TODO
      t.hash,                       -- hash
      t.from,                       -- from
      t.to,                         -- to
      t.gas_limit,                  -- gas
      t.gas_price,                  -- gasPrice
      t.nonce,                      -- nonce
      t.value,                      -- value
      t.data,                       -- input
      t.v,                          -- v
      t.r,                          -- r
      t.s                           -- s
    FROM transaction t
      LEFT JOIN block b ON t.block = b.id
    WHERE t.hash = transaction_hash
    LIMIT 1
    INTO STRICT result;
  RETURN result;
END;
$$ LANGUAGE plpgsql VOLATILE PARALLEL UNSAFE;