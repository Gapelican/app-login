export const validateRequest = (schema) => async (
  req, 
  res, 
  next
) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        message: 'Dados de entrada inválidos',
        errors: error.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
};