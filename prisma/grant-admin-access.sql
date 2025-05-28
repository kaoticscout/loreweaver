-- Update user role to admin
UPDATE "User"
SET role = 'admin'
WHERE email = 'aaronrklein@gmail.com';

-- Insert WorldAccess entries for any worlds the user doesn't already have access to
WITH user_id AS (
  SELECT id FROM "User" WHERE email = 'aaronrklein@gmail.com'
)
INSERT INTO "WorldAccess" (id, "worldId", "userId", role, "createdAt", "updatedAt")
SELECT 
  'wa_' || gen_random_uuid(), -- Generate a unique ID with 'wa_' prefix
  w.id,
  u.id,
  'editor',
  NOW(),
  NOW()
FROM "World" w
CROSS JOIN user_id u
WHERE NOT EXISTS (
  SELECT 1 
  FROM "WorldAccess" wa 
  WHERE wa."worldId" = w.id 
  AND wa."userId" = u.id
); 