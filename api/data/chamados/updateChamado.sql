UPDATE [dbo].[chamados]
SET [nome]=@nome,
    [email]=@email,
    [areaSolicitante]=@areaSolicitante,
    [cliente]=@cliente,
    [motivoChamado]=@motivoChamado,
    [data]=@data,
    [submotivos]=@submotivos,
    [status]=@status,
    [observacoes]=@observacoes,
    [tipos]=@tipos
WHERE [chamadoId]=@chamadoId

SELECT [chamadoId]
      ,[nome]
      ,[email]
      ,[areaSolicitante]
      ,[cliente]
      ,[motivoChamado]
      ,[data]
      ,[submotivos]
      ,[status]
      ,[observacoes]
      ,[tipos]
  FROM [dbo].[chamados]
  WHERE [chamadoId]=@chamadoId