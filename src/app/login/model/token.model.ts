import { AccountType } from './account-type.model';

export interface Token {
  tokenValue: string;
  accountType: AccountType;
  expirationDateTime: Date;
}
