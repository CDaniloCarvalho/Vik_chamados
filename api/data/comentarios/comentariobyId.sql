SELECT [comentarioId],
      [chamadoId],
      [alteradoPor],
      [comentario],
      [alteracao],
      [datas]
FROM [dbo].[comentarios]
WHERE [comentarioId]=@comentarioId
