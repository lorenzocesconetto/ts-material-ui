import { Api, checkStatusOk } from "./";

interface IAuth {
  accessToken: string;
}

const authenticate = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<IAuth> => {
  const errMsg = "AuthService.authenticate failed";
  const url = "/auth";
  try {
    const { data, status } = await Api.get<IAuth>(url, {
      data: { email, password },
    });
    if (checkStatusOk(status)) {
      return data;
    }
  } catch (err) {
    console.error(err);
    throw new Error((err as { message: string }).message || errMsg);
  }
  console.error(errMsg);
  throw new Error(errMsg);
};

const AuthService = { authenticate };

export { AuthService };
