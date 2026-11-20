export type Company = {
  companyName: string;
  activated: boolean;
  phone: string;
}

export type User = {
  _id: string;
  fName: string;
  lName: string;
  phone: string;
  role: string;
  lastSeen: Date,
  activated: boolean;
  companyId: string;
}


