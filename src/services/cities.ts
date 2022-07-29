import { Environment } from "../environment";
import { Api, checkStatusOk } from "./api";

export interface ICitiesList {
  id: number;
  name: string;
}

export interface ICitiesDetail {
  id: number;
  name: string;
}

type TCitiesData = {
  totalCount: number;
  data: ICitiesList[];
};

const getAll = async (page = 1, filter = ""): Promise<TCitiesData> => {
  const errMsg = "CitiesService.getAll failed";
  try {
    const url = `/cities?_page=${page}&_limit=${Environment.ROW_LIMIT}&name_like=${filter}`;
    const { data, headers, status } = await Api.get<ICitiesList[]>(url);
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

const getById = async (id: number): Promise<ICitiesDetail> => {
  const errMsg = "CitiesService.getById failed";
  try {
    const url = `/cities/${id}`;
    const { data, status } = await Api.get<ICitiesDetail>(url);
    if (checkStatusOk(status)) return data;
  } catch (err) {
    console.error(err);
    throw new Error((err as { message: string }).message || errMsg);
  }
  console.error(errMsg);
  throw new Error(errMsg);
};

const create = async (
  city: Omit<ICitiesDetail, "id">
): Promise<ICitiesDetail> => {
  const errMsg = "CitiesService.create failed";
  try {
    const url = "/cities";
    const { data, status } = await Api.post<ICitiesDetail>(url, city);
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
  city: Omit<ICitiesDetail, "id">
): Promise<ICitiesDetail> => {
  const errMsg = "CitiesService.updateById failed";
  try {
    const url = `/cities/${id}`;
    const { data, status } = await Api.put<ICitiesDetail>(url, city);
    if (checkStatusOk(status)) return data;
  } catch (err) {
    console.error(err);
    throw new Error((err as { message: string }).message || errMsg);
  }
  console.error(errMsg);
  throw new Error(errMsg);
};

const deleteById = async (id: number): Promise<ICitiesDetail> => {
  const errMsg = "CitiesService.deleteById failed";
  try {
    const url = `/cities/${id}`;
    const { data, status } = await Api.delete<ICitiesDetail>(url);
    if (checkStatusOk(status)) return data;
  } catch (err) {
    console.error(err);
    throw new Error((err as { message: string }).message || errMsg);
  }
  console.error(errMsg);
  throw new Error(errMsg);
};

const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

export { CitiesService };
