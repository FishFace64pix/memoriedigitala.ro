import { Pool, PoolClient } from 'pg';

// Mock database for development
let pool: Pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection cannot be established
  });
} else {
  // Mock pool for development
  pool = {
    query: async (text: string, params?: any[]) => {
      console.log('Mock DB Query:', text, params);
      return { rows: [], rowCount: 0 };
    },
    end: async () => {},
    connect: async () => ({ release: () => {} }),
  } as any;
}

/**
 * Execute function within a database transaction
 */
export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export default pool;

