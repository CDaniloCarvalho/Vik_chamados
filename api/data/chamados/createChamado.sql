INSERT INTO [dbo].[chamados]
    (
        [chamadoId],
        [nome],
        [email],
        [areaSolicitante],
        [cliente],
        [motivoChamado],
        [data],
        [submotivos],
        [status],       
        [observacoes],
        [tipos]
    )   
VALUES 
    (   
        @chamadoId,
        @nome,
        @email,
        @areaSolicitante,
        @cliente,
        @motivoChamado,
        @data,
        @submotivos,
        @status,
        @observacoes,
        @tipos
    )

SELECT SCOPE_IDENTITY() AS chamadoId