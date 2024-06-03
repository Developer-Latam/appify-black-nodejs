import { prisma } from "../../utils/dependencys/injection.js";
import handlePrismaError from "../../utils/httpRes/handlePrismaError.js";
class mpRepository {
  async registerPay(data) {
    try {
      return prisma.cuenta_banco_conciliacion.create({
        data: data,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findLinkByUserId(userid) {
    try {
      return prisma.link_fintoc_bancos.findUnique({
        where: { user: userid },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
export default new mpRepository();
