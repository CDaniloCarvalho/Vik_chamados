SELECT [usuarioid],
      [cnome],
      [csetor],
      [cliente],
      [telefone],
      [cemail],
      [csenha]
FROM [dbo].[usuarios]
WHERE [usuarioid]=@usuarioid