export interface IStore {
  id: number;
  phone?: string | null;
  storeType?: string | null;
  category?: string | null;
  name?: string | null;
  lng?: string | null;
  lat?: string | null;
  address?: string | null;
  foodCertifyName?: string | null;
  likes?: ILike[];
}
export interface ILike {
  id: number;
  storeId: number;
  userId: number;
  store?: IStore;
}
export interface ILikeApiResponse {
  data: ILike[];
  totalPage?: number;
  page?: number;
}
export interface IStoreApiResponse {
  data: IStore[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface ILocation {
  lat?: string | null;
  lng?: string | null;
  zoom: number;
}

export interface ISearch {
  q?: string;
  district?: string;
}
