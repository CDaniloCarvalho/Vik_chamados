UPDATE [dbo].[clientes]
SET [representante]=@representante,
    [departamento]=@departamento,
    [telefone]=@telefone,
    [email]=@email
WHERE [clienteId]=@clienteId 

SELECT [clienteId]
      ,[representante]
      ,[departamento]
      ,[telefone]
      ,[email]
  FROM [dbo].[clientes]
  WHERE [clienteId]=@clienteId