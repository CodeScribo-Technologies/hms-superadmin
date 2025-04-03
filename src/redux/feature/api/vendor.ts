import api from ".";
import { PaginationResponse, PaginationRequest } from "../../../type/common";
import {
  Vendor,
  VendorListRequest,
  VendorCreateRequest,
  VendorUpdateRequest,
} from "../../../type/vendor";

const vendorApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      /**
       * Get all vendors
       */
      getVendorList: build.query<
        PaginationResponse<Vendor>,
        PaginationRequest & VendorListRequest
      >({
        query: (params) => {
          return {
            url: `/api/v1/vendors`,
            params,
          };
        },
        providesTags: ["Vendor"],
      }),
      /**
       * Create a vendor
       */
      createVendor: build.mutation<{ message: string }, VendorCreateRequest>({
        query: (data) => {
          return {
            url: `/api/v1/vendors`,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["Vendor"],
      }),
      /**
       * Update a vendor
       */
      updateVendor: build.mutation<{ message: string }, VendorUpdateRequest>({
        query: (data) => {
          return {
            url: `/api/v1/vendors/${data.uuid}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["Vendor"],
      }),
      /**
       * Delete a vendor
       */
      deleteVendor: build.mutation<{ message: string }, string>({
        query: (uuid) => {
          return {
            url: `/api/v1/vendors/${uuid}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Vendor"],
      }),
    };
  },
});

export const {
  useLazyGetVendorListQuery,
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
} = vendorApi;

export default vendorApi;
