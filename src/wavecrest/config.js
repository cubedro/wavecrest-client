export const API_VERSION = '1.0.0';

export const API_PATH = 'https://wcapi.wavecrest.in/v3/services';
export const API_SANDBOX_PATH = 'https://wcapi.wavecrest.in/apisandbox';
export const API_AUTH_PATH = 'authenticator';

export const COUNTRY_CODES = [
  'AX', 'AL', 'AD', 'AI', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH',
  'BB', 'BY', 'BE', 'BZ', 'BM', 'BT', 'BQ', 'BA', 'BR', 'BN', 'BG', 'CA', 'KY',
  'CL', 'CN', 'CO', 'CR', 'HR', 'CY', 'CZ', 'DK', 'DM', 'DO', 'EC', 'SV', 'EE',
  'FK', 'FO', 'FI', 'FR', 'GF', 'GE', 'DE', 'GI', 'GR', 'GL', 'GD', 'GP', 'GT',
  'GG', 'GY', 'HK', 'HU', 'IS', 'ID', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE',
  'JO', 'KZ', 'KR', 'QZ', 'KW', 'LV', 'LI', 'LT', 'LU', 'MK', 'MY', 'MV', 'MT',
  'MQ', 'MU', 'MX', 'MD', 'MC', 'MN', 'ME', 'MA', 'NP', 'NL', 'NZ', 'NI', 'NO',
  'OM', 'PA', 'PG', 'PY', 'PE', 'PH', 'PL', 'PT', 'QA', 'RO', 'RU', 'BL', 'KN',
  'LC', 'MF', 'VC', 'SM', 'SA', 'RS', 'SC', 'SG', 'SX', 'SK', 'SI', 'SB', 'ZA',
  'ES', 'SR', 'SE', 'CH', 'TW', 'TH', 'TT', 'TR', 'TC', 'UA', 'AE', 'GB', 'UY',
  'VG'
];
export const CARD_STATUS = [
  'READY_TO_ACTIVE',
  'READY_FOR_AE',
  'Intermediate_Assignment',
  'ACTIVE',
  'EXPIRED',
  'LOST',
  'STOLEN',
  'DESTROYED',
  'DAMAGED',
  'DORMANT',
  'CLOSED',
  'REPLACED',
  'SUSPENDED',
  'SACTIVE',
  'REVOKED',
  'CCLOSED',
  'MBCLOSED',
  'FRAUD',
  'PFRAUD',
  'CHARGEOFF',
  'DECEASED',
  'WARNING',
  'MUCLOSED',
  'VOID',
  'NONRENEWAL',
  'LAST_STMT',
  'INACTIVE',
  'BLOCKED',
  'DEACTIVATE',
  'ENABLE',
  'UNSUSPEND',
];
export const CARD_PROGRAMS = [
  {
    value: 98,
    description: 'MyChoiceUK EUR Plastic MasterCard',
    currency: 'EUR',
    cardType: 'PLASTIC'
  },
  {
    value: 99,
    description: 'MyChoiceUK EUR Virtual MasterCard',
    currency: 'EUR',
    cardType: 'VIRTUAL'
  },
  {
    value: 100,
    description: 'MyChoiceUK USD Plastic MasterCard',
    currency: 'USD',
    cardType: 'PLASTIC'
  },
  {
    value: 101,
    description: 'MyChoiceUK USD Virtual MasterCard',
    currency: 'USD',
    cardType: 'VIRTUAL'
  },
  {
    value: 102,
    description: 'MyChoiceUK GBP Plastic MasterCard',
    currency: 'GBP',
    cardType: 'PLASTIC'
  },
  {
    value: 103,
    description: 'MyChoiceUK GBP Virtual MasterCard',
    currency: 'GBP',
    cardType: 'VIRTUAL'
  }
];
