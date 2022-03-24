INSERT INTO [dbo].[submotivos_chamados]
    (
        [submotivoId],
        [submotivo]
    )   
VALUES 
    (
        @submotivoId,
        @submotivo
    )

SELECT SCOPE_IDENTITY() AS submotivoId