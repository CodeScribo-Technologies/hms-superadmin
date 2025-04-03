import { BaseEntity } from './common';

export interface Vendor extends BaseEntity {
  uuid: string;
  name: string;
  logo: string;
  is_master: boolean;
  is_active: boolean;
}

export interface VendorListRequest {
  is_active?: boolean;
}

export type VendorCreateRequest = {
  name: string;
  logo: string;
  is_master: boolean;
  is_active: boolean;
};

export type VendorUpdateRequest = {
  uuid: string;
  name: string;
  logo: string;
  is_master: boolean;
  is_active: boolean;
};
