export interface BaseEntity {
    ID: number;
    uuid: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
  }
  
  export interface PaginationResponse<T> {
    data: T[];
    total: number;
  }
  
  export interface PaginationRequest {
    page: number | string;
    limit: number | string;
    search?: string;
    [key: string]: string | number | undefined;
  }
  