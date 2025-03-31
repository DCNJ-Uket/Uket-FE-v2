import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { getQueryClient } from "../get-query-client";
import {
  AdminUserListResponse,
  OrganizationResponse,
} from "../types/admin-user";

const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 10;

const getAdminUserList = async ({
  page = DEFAULT_PAGE_NUMBER,
  size = DEFAULT_PAGE_SIZE,
}) => {
  const { data } = await axios.get<AdminUserListResponse>(`/api/admin/users`, {
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
  organizations: () => ({
    queryKey: ["organizations"],
    queryFn: async () => {
      const { data } =
        await axios.get<OrganizationResponse>("/api/organizations");

      return data;
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
};

export const useQueryOrganizationList = () => {
  return useQuery({
    ...adminUser.organizations(),
  });
};
