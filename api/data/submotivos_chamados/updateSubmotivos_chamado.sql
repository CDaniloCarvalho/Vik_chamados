UPDATE [dbo].[submotivos_chamados]
SET [submotivoId]=@submotivoId,
    [submotivo]=@submotivo
WHERE [submotivoId]=@submotivoId

SELECT [submotivoId]
      ,[submotivo]
  FROM [dbo].[submotivos_chamados]
  WHERE [submotivoId]=@submotivoId