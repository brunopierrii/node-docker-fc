import postgres from 'postgres';

const sql = postgres('postgres://fullcycle_user:fullcycle_pass@db:5432/fullcycle');

export default sql;