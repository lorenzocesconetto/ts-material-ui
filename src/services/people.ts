import { Environment } from "../environment";
import { Api, checkStatusOk } from "./";

export interface IPeopleList {
  id: number;
  name: string;
  email: string;
  cityId: number;
}

export interface IPeopleDetail {
  id: number;
  name: string;
  email: string;
  cityId: number;
}

type TPeopleData = {
  totalCount: number;
  data: IPeopleList[];
};

const getAll = async (page = 1, filter = ""): Promise<TPeopleData> => {
  const errMsg = "PeopleService.getAll failed";
  const url = `/people?_page=${page}&_limit=${Environment.ROW_LIMIT}&name_like=${filter}`;
  try {
    const { data, headers, status } = await Api.get<IPeopleList[]>(url);
    if (checkStatusOk(status)) {
      return { totalCount: parseInt(headers["x-total-count"]), data };
    }
  } catch (err) {
    console.error(err);
    throw new Error((err as { message: string }).message || errMsg);
  }
  console.error(errMsg);
  throw new Error(errMsg);
};

const getById = async (id: number): Promise<IPeopleDetail> => {
  const errMsg = "PeopleService.getById failed";
  const url = `/people/${id}`;
  try {
    const { data, status } = await Api.get<IPeopleDetail>(url);
    if (checkStatusOk(status)) return data;
  } catch (err) {
    console.error(err);
    throw new Error((err as { message: string }).message || errMsg);
  }
  console.error(errMsg);
  throw new Error(errMsg);
};

const create = async (
  person: Omit<IPeopleDetail, "id">
): Promise<IPeopleDetail> => {
  const errMsg = "PeopleService.create failed";
  const url = "/people";
  try {
    const { data, status } = await Api.post<IPeopleDetail>(url, person);
    if (checkStatusOk(status)) return data;
  } catch (err) {
    console.error(err);
    throw new Error((err as { message: string }).message || errMsg);
  }
  console.error(errMsg);
  throw new Error(errMsg);
};

const updateById = async (
  id: number,
  person: Omit<IPeopleDetail, "id">
): Promise<IPeopleDetail> => {
  const errMsg = "PeopleService.updateById failed";
  const url = `/people/${id}`;
  try {
    const { data, status } = await Api.put<IPeopleDetail>(url, person);
    if (checkStatusOk(status)) return data;
  } catch (err) {
    console.error(err);
    throw new Error((err as { message: string }).message || errMsg);
  }
  console.error(errMsg);
  throw new Error(errMsg);
};

const deleteById = async (id: number): Promise<IPeopleDetail> => {
  const errMsg = "PeopleService.deleteById failed";
  const url = `/people/${id}`;
  try {
    const { data, status } = await Api.delete<IPeopleDetail>(url);
    if (checkStatusOk(status)) return data;
  } catch (err) {
    console.error(err);
    throw new Error((err as { message: string }).message || errMsg);
  }
  console.error(errMsg);
  throw new Error(errMsg);
};

const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

export { PeopleService };
