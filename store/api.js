// src/store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use VITE_BACKEND_URL (Netlify env var) or fall back to localhost for dev
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/`,            // 👈 note the “/api/” prefix
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem('jwt_token') ||
        localStorage.getItem('token');          // support both keys
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Vehicle', 'User', 'Auction', 'Inquiry'],
  endpoints: (builder) => ({
    //////////////////
    // Auth
    //////////////////
    login: builder.mutation({
      query: (credentials) => ({
        url: `auth/login`,                       // will hit `${API_BASE_URL}/api/auth/login`
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('jwt_token', data.token);
          localStorage.setItem('user_id', data.user.id);
          localStorage.setItem('user_role', data.user.role);
        } catch (error) {
          console.error('Login mutation failed:', error);
        }
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: `auth/register`,
        method: 'POST',
        body: userData,
      }),
    }),

    //////////////////
    // Vehicles
    //////////////////
    getVehicles: builder.query({
      query: (params) => ({ url: 'vehicles', params }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Vehicle', id })),
              { type: 'Vehicle', id: 'LIST' },
            ]
          : [{ type: 'Vehicle', id: 'LIST' }],
    }),
    getVehicleById: builder.query({
      query: (id) => `vehicles/${id}`,
      providesTags: (result, error, id) => [{ type: 'Vehicle', id }],
    }),
    createVehicle: builder.mutation({
      query: (formData) => ({
        url: 'admin/vehicles',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Vehicle', id: 'LIST' }],
    }),
    updateVehicle: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `admin/vehicles/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Vehicle', id }],
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `admin/vehicles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Vehicle', id: 'LIST' }],
    }),
    uploadVehicleImage: builder.mutation({
      query: (formData) => ({
        url: 'admin/vehicles/upload',
        method: 'POST',
        body: formData,
      }),
    }),

    //////////////////
    // Auctions
    //////////////////
    getAuctions: builder.query({
      query: () => 'auctions',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Auction', id })),
              { type: 'Auction', id: 'LIST' },
            ]
          : [{ type: 'Auction', id: 'LIST' }],
    }),
    getAuctionById: builder.query({
      query: (id) => `auctions/${id}`,
      providesTags: (result, error, id) => [{ type: 'Auction', id }],
    }),
    placeBid: builder.mutation({
      query: ({ auctionId, bidAmount }) => ({
        url: `auctions/${auctionId}/bid`,
        method: 'POST',
        body: { bid_amount: bidAmount },
      }),
      async onQueryStarted({ auctionId, bidAmount }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          mainApi.util.updateQueryData('getAuctionById', auctionId, (draft) => {
            draft.current_highest_bid = Math.max(draft.current_highest_bid || 0, bidAmount);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { auctionId }) => [{ type: 'Auction', id: auctionId }],
    }),
    createAuction: builder.mutation({
      query: (payload) => ({
        url: 'admin/auctions',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [{ type: 'Auction', id: 'LIST' }],
    }),
    updateAuction: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `admin/auctions/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Auction', id }],
    }),
    deleteAuction: builder.mutation({
      query: (id) => ({
        url: `admin/auctions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Auction', id: 'LIST' }],
    }),

    //////////////////
    // Users
    //////////////////
    getMe: builder.query({
      query: () => 'users/me',
      providesTags: ['User'],
    }),
    updateMe: builder.mutation({
      query: (patch) => ({
        url: 'users/me',
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['User'],
    }),

    //////////////////
    // Inquiries
    //////////////////
    getInquiries: builder.query({
      query: () => 'admin/inquiries',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Inquiry', id })),
              { type: 'Inquiry', id: 'LIST' },
            ]
          : [{ type: 'Inquiry', id: 'LIST' }],
    }),
    updateInquiryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `admin/inquiries/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Inquiry', id },
        { type: 'Inquiry', id: 'LIST' },
      ],
    }),
    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: `admin/inquiries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Inquiry', id: 'LIST' }],
    }),

    //////////////////
    // Admin Users
    //////////////////
    getUsers: builder.query({
      query: () => 'admin/users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User', id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `admin/users/${id}/role`,
        method: 'PUT',
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetVehiclesQuery,
  useGetVehicleByIdQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useUploadVehicleImageMutation,
  useGetAuctionsQuery,
  useGetAuctionByIdQuery,
  usePlaceBidMutation,
  useCreateAuctionMutation,
  useUpdateAuctionMutation,
  useDeleteAuctionMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useGetInquiriesQuery,
  useUpdateInquiryStatusMutation,
  useDeleteInquiryMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} = mainApi;
