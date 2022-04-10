using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class DataLockProcedures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var nodeEdgeChildrenProc = @"
                CREATE OR ALTER PROCEDURE dbo.NodeEdgeChildren @NodeId VARCHAR(255)
                AS
                BEGIN

	                WITH nodes
	                AS
	                (
		                SELECT ToNodeId AS Id, 0 AS Type FROM Edge, Connector WHERE Edge.FromConnectorId = Connector.id AND Connector.Discriminator = 'Relation' AND FromNodeId = @NodeId  
		                UNION ALL
		                SELECT e.ToNodeId AS Id, 0 AS Type FROM Edge e, Connector c, nodes n WHERE e.FromConnectorId = c.id AND c.Discriminator = 'Relation' AND e.FromNodeId = n.Id
	                )

	                SELECT e.Id, 1 AS Type FROM Edge e WHERE e.ToNodeId IN (SELECT Id FROM nodes) AND e.ToNodeId != @NodeId UNION SELECT * FROM nodes

                END   
            ";

            var nodeAttributesProc = @"
                CREATE OR ALTER PROCEDURE dbo.NodeAttributes @NodeId VARCHAR(255)
                AS
                BEGIN
	                (SELECT Id AS Id, 2 AS Type FROM Attribute WHERE NodeId = @NodeId)
                UNION
	                (SELECT Id AS Id, 2 AS Type FROM Attribute WHERE TerminalId IN (SELECT Id FROM Connector WHERE Discriminator = 'Terminal' AND NodeId = @NodeId))
                END
            ";

            var edgeAttributesProc = @"
                CREATE OR ALTER PROCEDURE dbo.EdgeAttributes @EdgeId VARCHAR(255)
                AS
                BEGIN

	                (SELECT Id AS Id, 2 AS Type FROM Attribute WHERE TerminalId IN (SELECT OutputTerminalId AS outTerminal FROM Transport WHERE	Transport.Id IN (SELECT TransportId FROM Edge WHERE Id = @EdgeId)))
                UNION
	                (SELECT Id AS Id, 2 AS Type FROM Attribute WHERE TerminalId IN (SELECT InputTerminalId AS inTerminal FROM Transport WHERE Transport.Id IN (SELECT TransportId FROM Edge WHERE Id = @EdgeId)))
                UNION
	                (SELECT Id AS Id, 2 AS Type FROM Attribute WHERE TransportId IN (SELECT TransportId FROM Edge WHERE Id = @EdgeId))
                UNION
	                (SELECT Id AS Id, 2 AS Type FROM Attribute WHERE TerminalId IN (SELECT OutputTerminalId AS outTerminal FROM Interface WHERE	Interface.Id IN (SELECT InterfaceId FROM Edge WHERE Id = @EdgeId)))
                UNION
	                (SELECT Id AS Id, 2 AS Type FROM Attribute WHERE TerminalId IN (SELECT InputTerminalId AS inTerminal FROM Interface WHERE Interface.Id IN (SELECT InterfaceId FROM Edge WHERE Id = @EdgeId)))
                UNION
	                (SELECT Id AS Id, 2 AS Type FROM Attribute WHERE TransportId IN (SELECT InterfaceId FROM Edge WHERE Id = @EdgeId))

                END
            ";

            var nodeLockDataProc = @"
                CREATE OR ALTER PROCEDURE dbo.NodeLockData @NodeId VARCHAR(255)
                AS
                BEGIN
	                
	                DECLARE @nodeEdge TABLE(Id VARCHAR(255), Type INT )
	                DECLARE @attributes TABLE(Id VARCHAR(255), Type INT )
	                DECLARE @id VARCHAR(255);
	                
	                INSERT INTO @nodeEdge EXEC NodeEdgeChildren @NodeId;
                    INSERT INTO @nodeEdge (Id, Type) VALUES (@NodeId, 0);
	                SELECT Id INTO #TempEdges FROM @nodeEdge WHERE Type = 1
	                SELECT Id INTO #TempNodes FROM @nodeEdge WHERE Type = 0

	                WHILE EXISTS(SELECT * FROM #TempEdges)
	                BEGIN
		                SELECT TOP(1) @id = Id FROM #TempEdges;
		                DELETE FROM #TempEdges WHERE Id = @id;
		                INSERT INTO @attributes EXEC EdgeAttributes @id;
	                END

	                WHILE EXISTS(SELECT * FROM #TempNodes)
	                BEGIN
		                SELECT TOP(1) @id = Id FROM #TempNodes;
		                DELETE FROM #TempNodes WHERE Id = @id;
		                INSERT INTO @attributes EXEC NodeAttributes @id;
	                END

	                SELECT * FROM @nodeEdge UNION SELECT * FROM @attributes

                END
            ";

            var edgeLockDataProc = @"
                CREATE OR ALTER PROCEDURE dbo.EdgeLockData @EdgeId VARCHAR(255)
                AS
                BEGIN

	                DECLARE @data TABLE(Id VARCHAR(255), Type INT )
	                INSERT INTO @data (Id, Type) VALUES (@EdgeId, 1);
	                INSERT INTO @data EXEC EdgeAttributes @EdgeId;
	                SELECT * FROM @data

                END
            ";

            migrationBuilder.Sql(nodeEdgeChildrenProc);
            migrationBuilder.Sql(nodeAttributesProc);
            migrationBuilder.Sql(edgeAttributesProc);
            migrationBuilder.Sql(nodeLockDataProc);
            migrationBuilder.Sql(edgeLockDataProc);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS dbo.EdgeLockData");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS dbo.NodeLockData");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS dbo.NodeEdgeChildren");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS dbo.NodeAttributes");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS dbo.EdgeAttributes");
        }
    }
}