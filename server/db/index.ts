import { createPool } from 'mysql2/promise'

interface Options {
  query: string
  values?: any[]
}

const pool = createPool({
  host: 'localhost',
  user: 'root',
  database: 'sound_ost',
  password: import.meta.env.DB_PASSWORD,
});

export const sql = async ({ query, values }: Options) => {
  const [rows] = await pool.query(query, values)
  return rows
}
