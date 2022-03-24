UPDATE [dbo].[usuarios]
SET [cnome]=@cnome,
    [csetor]=@csetor,
    [cliente]=@cliente,
    [telefone]=@telefone,
    [cemail]=@cemail,
    [csenha]=@csenha
WHERE [usuarioid]=@usuarioid

SELECT [usuarioid]
      ,[cnome]
      ,[csetor]
      ,[cliente]
      ,[telefone]
      ,[cemail]
      ,[csenha]
  FROM [dbo].[usuarios]
  WHERE [usuarioid]=@usuarioid