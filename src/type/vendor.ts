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
  vendor_name: string;
  name: string;
  logo: string;
  email: string;
  password: string;
  is_master?: boolean;
  is_active: boolean;
  packageDetails: {
    package_type: string;
    package_id:string;
    price: number;
    period: string;
    interval: number;
    is_active: boolean;
    is_trial: boolean;
    trial_period_in_days: number;
    features: {
      id: string;
      value: string;
    }[];
  };
};

export type VendorUpdateRequest = {
    uuid: string;
    name: string;
    logo: string;
    is_master: boolean;
    is_active: boolean;
    packageDetails?: {
      name: string;
      package_type: string;
      package_id:string;
      price: number;
      period: string;
      interval: number;
      is_active: boolean;
      trial_period_in_days: number;
      features: {
        id: string;
        value: string;
      }[];
    };
  };
  
