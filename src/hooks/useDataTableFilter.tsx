import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TablePaginationConfig } from "antd";
import { PaginationRequest } from "../type/common";

type Params = {
  fetchData: (queryParams: PaginationRequest & Record<string, string>) => void;
};

export const useDataTableFilter = (
{ fetchData }: Params
) => {
  const [queryParams, setQueryParams] = useSearchParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const searchParam = queryParams.get("search");
    const page = queryParams.get("page") ?? "1";
    const limit = queryParams.get("limit") ?? "10";
    if (searchParam !== null) {
      setSearch(searchParam);
    }
    const queryParamsObject: Record<string, string> = {};
    queryParams.forEach((value, key) => {
      queryParamsObject[key] = value;
    });
    fetchData({ ...queryParamsObject, page, limit });
  }, [queryParams, fetchData]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setQueryParams({ search: value });
  };

  const handleOnSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePaginationChange = (pagination: TablePaginationConfig) => {
    setQueryParams({
      page: pagination.current?.toString() ?? "1",
      limit: pagination.pageSize?.toString() ?? "10",
    });
  };

  return { search, handleSearch, handleOnSearchChange, handlePaginationChange };
};