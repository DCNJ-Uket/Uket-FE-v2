/* eslint-disable react-hooks/rules-of-hooks */
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { dehydrate, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetcherAdmin } from "../admin-instance";
import { getQueryClient } from "../get-query-client";
import { AdminUserInfoResponse } from "../types/admin-auth";
import {
  AdminUserListResponse,
  OrganizationResponse,
} from "../types/admin-user";
import { getToken } from "@uket/util/cookie-client";

const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 10;

const getAdminUserList = async ({
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
}) => {
  const { data } = await fetcherAdmin.get<AdminUserListResponse>("/users", {
    mode: "BOUNDARY",
    params: {
      page,
      size,
    },
  });

  return data;
};

export const adminUser = createQueryKeys("admin-user", {
  list: ({ page, size }) => ({
    queryKey: [page],
    queryFn: () => getAdminUserList({ page, size }),
  }),
  info: () => ({
    queryKey: ["admin-info"],
    queryFn: async () => {
      const { data } = await fetcherAdmin.get<AdminUserInfoResponse>(
        "/users/info",
        {
          mode: "TOAST_UI",
        },
      );

      return data;
    },
  }),
  organizations: () => ({
    queryKey: ["organizations"],
    queryFn: async () => {
      const { data } =
        await fetcherAdmin.get<OrganizationResponse>("/organizations");

      return data.items;
    },
  }),
});

export const useQueryAdminUserList = ({
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
}) => {
  return useSuspenseQuery({
    ...adminUser.list({ page, size }),
  });
};

export const prefetchAdminUserList = (
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    ...adminUser.list({ page, size }),
  });

  return dehydrate(queryClient);
};

export const useQueryOrganizationList = () => {
  return useQuery({
    ...adminUser.organizations(),
  });
};

export const useQueryAdminInfo = () => {
  const accessToken = getToken("admin", "access");

  if (!accessToken) return { data: null };

  return useQuery({
    ...adminUser.info(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!accessToken,
  });
};
