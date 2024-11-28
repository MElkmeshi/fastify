import OdooJSONRpc from '@fernandoslim/odoo-jsonrpc';
import dotenv from 'dotenv';

dotenv.config();

export const odoo = new OdooJSONRpc();

export const connectOdoo = async () => {
  if (!odoo.is_connected) {
    await odoo.connect({
      baseUrl: process.env.ODOO_BASE_URL,
      port: Number(process.env.ODOO_PORT),
      db: process.env.ODOO_DB,
      username: process.env.ODOO_USERNAME,
      password: process.env.ODOO_PASSWORD,
    });
  }
};