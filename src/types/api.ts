export type APIConfig = {
  keys: string[];
  endPoint: string;
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';
  accessToken?: boolean;
  factoryData?: object;
};

export interface EndPointParameter {
  [index: string]: string | number;
}
