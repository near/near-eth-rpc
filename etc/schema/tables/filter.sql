DROP TABLE IF EXISTS filter CASCADE;

CREATE TABLE filter (
  id                uuid NOT NULL PRIMARY KEY,
  type              filter_type NOT NULL,
  created_at        instant NOT NULL,
  created_by        inet NOT NULL,
  polled_at         instant NULL,
  poll_block        blockno NULL,
  from_block        blockno NULL,
  to_block          blockno NULL,
  addresses         address[] NULL CHECK (array_length(addresses, 1) > 0),
  topics            jsonb NULL
);
