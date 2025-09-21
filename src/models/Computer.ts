export interface IComputer {
  id: number;
  name: string;
  secondname: string;
  locality: string;
  processor: string;
  ram: number;
  storage: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComputerStore {
  name: string;
  secondname: string;
  locality: string;
  processor: string;
  ram: number;
  storage: number;
  description?: string;
}
