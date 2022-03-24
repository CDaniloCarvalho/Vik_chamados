UPDATE [dbo].[motivos_chamados]
SET [motivos_chamadoId]=@motivos_chamadoId,
    [motivos_chamado]=@motivos_chamado
WHERE [motivos_chamadoId]=@motivos_chamadoId

SELECT [motivos_chamadoId]
      ,[motivos_chamado]
  FROM [dbo].[motivos_chamados]
  WHERE [motivos_chamadoId]=@motivos_chamadoId