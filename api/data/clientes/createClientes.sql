INSERT INTO [dbo].[clientes]
    (
        [representante],
        [departamento],
        [telefone],
        [email]
    )   
VALUES 
    (
        @representante,
        @departamento,
        @telefone,
        @email
    )

SELECT SCOPE_IDENTITY() AS clienteId