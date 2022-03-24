INSERT INTO [dbo].[usuarios]
    (
        [cnome],
        [csetor],
        [cliente],
        [telefone],
        [cemail],
        [csenha]
    )   
VALUES 
    (
        @cnome,
        @csetor,
        @cliente,
        @telefone,
        @cemail,
        @csenha
    )

SELECT SCOPE_IDENTITY() AS id