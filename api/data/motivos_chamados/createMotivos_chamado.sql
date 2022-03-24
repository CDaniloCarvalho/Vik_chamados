INSERT INTO [dbo].[motivos_chamados]
    (
        [motivos_chamadoId],
        [motivos_chamado]
    )   
VALUES 
    (
        @motivos_chamadoId,
        @motivos_chamado
    )

SELECT SCOPE_IDENTITY() AS motivos_chamadoId