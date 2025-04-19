// TODO: 타입 변경?
export type Content = {
  id: number;
  name: string;
  email: string;
  password: string;
  organizationId: number;
  organizationName: string;
  isSuperAdmin: boolean;
};

export interface PaginationMeta {
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  empty: boolean;
}

export interface AdminUserListResponse extends PaginationMeta {
  content: Content[];
}

export interface AdminRemoveParams {
  adminId: Content["id"];
}

export interface AdminRemoveResponse {
  adminId: number;
  name: string;
}

export interface AdminAddResponse {
  success: boolean;
  email: string;
}

export type Organization = {
  id: number;
  name: string;
};

export interface OrganizationResponse {
  items: Organization[];
}
