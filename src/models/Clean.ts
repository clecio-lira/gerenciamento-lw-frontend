export interface IClean {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICleanStore {
  name: string;
  description?: string;
}
