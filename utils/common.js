const asyncHandler = (handler) => async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      if (result !== undefined) {
        res.status(200).json({
          statusCode: 200,
          message: "Success",
          data: result,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  
  const createHandler = (serviceFunction) =>
    asyncHandler(async (req, res) => {
      const createdItem = await serviceFunction(req.body);
      res.status(201).json({
        statusCode: 201,
        message: "Created successfully",
        data: createdItem,
      });
    });
  
  const getAllHandler = (serviceFunction) =>
    asyncHandler(async (req, res) => {
      return await serviceFunction();
    });
  
  const getByIdHandler = (serviceFunction) =>
    asyncHandler(async (req, res) => {
      const item = await serviceFunction(req.params.id);
      if (!item) {
        res.status(404).json({ statusCode: 404, message: "Not found" });
        return;
      }
      return item;
    });
  
  const deleteHandler = (serviceFunction) =>
    asyncHandler(async (req, res) => {
      const deletedItem = await serviceFunction(req.params.id);
      if (!deletedItem) {
        res.status(404).json({ statusCode: 404, message: "Not found" });
        return;
      }
      res.status(200).json({ statusCode: 200, message: "Deleted successfully" });
    });
  
  module.exports = {
    createHandler,
    getAllHandler,
    getByIdHandler,
    deleteHandler,
  };
  