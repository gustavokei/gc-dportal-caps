USE [gc]
GO

/****** Object:  Table [dbo].[GCAPPEmail]    Script Date: 30/10/2020 10:57:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GCAPPEmail](
	[Login] [nvarchar](40) NOT NULL,
	[email] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO


