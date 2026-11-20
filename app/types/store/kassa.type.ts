export type WalletPayload = {
	
}

export type Wallet = {
	_id: string;
  companyId: Company;
  userId: User;

	walletName: string
	bankNumber: string
	color: string
	balance: number
	
}