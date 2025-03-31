export type Content = {
  id: number;
  name: string;
  email: string;
  organization: string;
  authority: string;
};

export interface PaginationMeta {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface AdminUserListResponse extends PaginationMeta {
  content: Content[];
}

export interface AdminUseDefaultResponse {
  adminId: Content["id"];
  name: Content["name"];
}

export interface AdminRemoveParams {
  adminId: Content["id"];
}

export type Organization = {
  organizationId: number;
  name: string;
}

export type OrganizationList = Organization[];

export type OrganizationResponse = OrganizationList;