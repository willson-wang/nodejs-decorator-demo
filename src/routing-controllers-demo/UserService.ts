import { Service } from "typedi";

@Service()
export default class UserService {
  async list(): Promise<any> {
    return new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => {
        resolve(1)
      }, 1000);
    });
  }
}
