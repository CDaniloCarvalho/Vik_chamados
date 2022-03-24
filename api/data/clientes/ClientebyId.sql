SELECT [clienteId],
      [representante],
      [departamento],
      [telefone],
      [email]
FROM [dbo].[clientes]
WHERE [clienteId]=@clienteId