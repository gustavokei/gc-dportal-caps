USE [gc]
GO
/****** Object:  Trigger [dbo].[new_account]    Script Date: 12/10/2020 9:48:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER TRIGGER [dbo].[new_account] ON  [dbo].[users] FOR INSERT
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here

INSERT INTO [dbo].[VCGAVirtualCash] (LoginUID, VCPoint)
SELECT LoginUID,'3000' FROM [Inserted](nolock)

INSERT INTO [dbo].[CashUsers] (Login, Cash)
SELECT Login,'3000' FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,0,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,1,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,2,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,3,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,4,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,5,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,6,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 6, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,7,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 7, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,8,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 8, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,9,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 9, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,10,0,0,30,0,0,LoginUID,112405 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 10, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,11,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 11, 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,12,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 12, 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,13,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 13, 13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,14,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 14, 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,15,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 15, 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,16,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 16, 16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,17,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 17, 17, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,18,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 18, 18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)

INSERT INTO [dbo].Characters (Login, CharType, Promotion, Exp, Level, Win, Lose, LoginUID, ExpS4)
SELECT Login,19,0,0,0,0,0,LoginUID,0 FROM [Inserted](nolock)
INSERT INTO [dbo].CIGACharacterInfo([LoginUID], [CharType], [SlotNo], [CreateDateA], [LastLoginDateA], [GamePoint], [DefaultBonus], [SpecialBonus], [InvenSize], [CoordiSize])
SELECT LoginUID, 19, 19, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000, 10, 0, 90, 100 FROM [Inserted](nolock)


	end
