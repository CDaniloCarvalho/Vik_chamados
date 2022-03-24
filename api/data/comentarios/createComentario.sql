INSERT INTO [dbo].[comentarios]
    (   [chamadoId],
        [alteradoPor],
        [comentario],
        [alteracao],
        [datas]
    )   
VALUES 
    (
        @chamadoId,
        @alteradoPor,
        @comentario,
        @alteracao,
        @datas
    )

SELECT SCOPE_IDENTITY() AS comentarioId