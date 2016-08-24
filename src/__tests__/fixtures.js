import dotenv from 'dotenv';
dotenv.config({silent: true});

export const DEVELOPER_ID = process.env.DEVELOPER_ID || 'devId';

export const DEVELOPER_PASSWORD = process.env.DEVELOPER_PASSWORD || 'devPass';

export const HEADERS_LOGIN = {
  'User-Agent': 'wavecrest-node-client',
  'Content-Type': 'application/json',
  Accept: 'application/json',
  DeveloperId: DEVELOPER_ID,
  DeveloperPassword: DEVELOPER_PASSWORD,
  'X-Method-Override': 'login'
};

export const HEADERS_DEFAULT = {
  'User-Agent': 'wavecrest-node-client',
  'Content-Type': 'application/json',
  Accept: 'application/json',
  DeveloperId: DEVELOPER_ID,
};
