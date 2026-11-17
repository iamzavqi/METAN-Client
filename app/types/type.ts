export interface Company {
  companyName: string;
  activated: boolean;
  phone: string;
}

export interface User {
  _id: string;
  fName: string;
  lName: string;
  phone: string;
  role: string;
  activated: boolean;
  company: string;
}

//  oddiy ichki foydalanish uchun
export interface DateByCalendar {
  day: number;
  month: number;
  year: number;
}

/*                         FORMA                          */
export interface CategoryForm {
  categoryName: string;
  status: number;
  type: number;
  categoryID: string;
}
export interface SubCategoryForm {
  name: string;
  comment: string;
}
export interface TransactionForm {
  amount: number;
  commission: number;
  commissionPercent: number;
  comment: string;
  dds: number;
  inOrOut: number;
  kontragentID: string;
  skladTransactionID: string;
  categoryID: string;
  subCategoryID: string;
  walletID: string;
}
export interface NachisleniyaForm {
  amount: number;
  isSalary: boolean;
  workerID: string | null;
  kontragentID: string | null;
  categoryID: string;
  subCategoryID: string;
  comment: string;
}

export interface CustomerForm {
  fName: string;
  lName: string;
  phone1: string;
  phone2: string;
}

export interface KontragentForm {
  name: string;
  phone: string;
}

export interface WorkerForm {
  fName: string;
  lName: string;
  phone1: string;
  phone2: string;
  position: string;
}
export interface AssetForm {
  name: string;
  type: string;
  totalCost: number;
  paidAmount: number;
  kontragentID: string;
  walletID: string;
  comment: string;
}

/*                          USE                                  */
export interface Wallet {
  _id: string;
  walletName: string;
  color:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "error"
    | "neutral";
  balance: number;
  userId: User;
  createdAt: Date;
  updatedAt: Date;
}
export interface Category {
  _id: string;
  categoryName: string;
  subCategories: SubCategory[];
  status: number;
  type: number;
  inOrOut: number;
  userId: User;
  createdAt: Date;
  updatedAt: Date;
}
export interface SubCategory {
  _id: string;
  name: string;
  comment: string;
  userId: User;
  createdAt: Date;
  updatedAt: Date;
}
export interface Transaction {
  _id: string;
  amount: number;
  commission: number;
  commissionPercent: number;
  date: Date;
  comment: string;
  dds: number;
  inOrOut: number;
  assetID: Asset;
  workerID: Worker;
  kontragentID: Kontragent;
  categoryID: Category;
  subCategoryID: SubCategory;
  walletID: Wallet;
  userId: User;
  createdAt: Date;
  updatedAt: Date;
}
export interface Nachisleniya {
  _id: string;
  amount: number;
  date: Date;
  isSalary: boolean;
  workerID: Worker | null;
  kontragentID: Kontragent;
  categoryID: Category;
  subCategoryID: SubCategory;
  comment: string;
  userId: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Kontragent {
  _id: string;
  name: string;
  balance: number;
  phone: string;
  comment: string;
  userId: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Worker {
  _id: string;
  fName: string;
  lName: string;
  phone1: string;
  phone2: string;
  balance: number;
  active: boolean;
  position: string;
  userId: User;
  createdAt: Date;
  updatedAt: Date;
}
export interface Asset {
  _id: string;
  name: string;
  type: string;
  totalCost: number;
  paidAmount: number;
  currentCost: number;
  remainingDebt: number;
  kontragentID: Kontragent;
  walletID: Wallet;
  comment: string;
  date: Date;
  userId: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Perebroska {
  _id: string;
  amount: number;
  oneWalletID: Wallet;
  twoWalletID: Wallet;
  userId: User;
  createdAt: Date;
  updatedAt: Date;
}
