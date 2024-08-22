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
}

export interface IStoreApiResponse {
  data: IStore[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface ILocation {
  lat: number;
  lng: number;
  zoom: number;
}
