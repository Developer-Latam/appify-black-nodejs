export const testMPController = async (req, res, next) => {
    const { code } = req.query;
    if (!code) {
        ResponseHandler.Unauthorized(res, "Falta la query");
    }
    try {
        ResponseHandler.Ok(res, code);
    } catch (error) {
        ResponseHandler.HandleError(res, error);
    }
}