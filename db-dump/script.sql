CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TYPE IF EXISTS cart_status;

CREATE TYPE cart_status AS ENUM('OPEN', 'ORDERED');

CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  status cart_status
)

CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY,
  cart_id UUID REFERENCES carts(id),
  product_id TEXT,
  count INTEGER DEFAULT 0
)


INSERT INTO carts(id, user_id, created_at, updated_at, status)
VALUES
  ('8315db35-c07a-47c8-9c1e-04f12c95010d', '7d71c323-727a-4f3b-b593-01001ee7904a', NOW(), NOW(), 'OPEN'),
  ('d531816c-bfdd-4c03-9b9d-af500825dfae', '7d71c323-727a-4f3b-b593-01001ee7904b', NOW(), NOW(), 'OPEN')

INSERT INTO cart_items(id, cart_id, product_id, count)
VALUES
  (uuid_generate_v4(), '8315db35-c07a-47c8-9c1e-04f12c95010d', 'p6RR_IXd3aOi3MSnwoi3a', 2),
  (uuid_generate_v4(), '8315db35-c07a-47c8-9c1e-04f12c95010d', 'p6RR_IXd3aOi3MSnwoi3a', 2),
  (uuid_generate_v4(), 'd531816c-bfdd-4c03-9b9d-af500825dfae', 'p6RR_IXd3aOi3MSnwoi3a', 2)


