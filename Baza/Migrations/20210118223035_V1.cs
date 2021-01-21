using Microsoft.EntityFrameworkCore.Migrations;

namespace Baza.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Luka",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Luka", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Brod",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaxKapacitet = table.Column<int>(type: "int", nullable: false),
                    BrojUpotrebljivihKontejnera = table.Column<int>(type: "int", nullable: false),
                    TrenutnaZauzetost = table.Column<int>(type: "int", nullable: false),
                    LukaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brod", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Brod_Luka_LukaID",
                        column: x => x.LukaID,
                        principalTable: "Luka",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Kontejner",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tezina = table.Column<int>(type: "int", nullable: false),
                    Oznaka = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    BrodID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kontejner", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Kontejner_Brod_BrodID",
                        column: x => x.BrodID,
                        principalTable: "Brod",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Brod_LukaID",
                table: "Brod",
                column: "LukaID");

            migrationBuilder.CreateIndex(
                name: "IX_Kontejner_BrodID",
                table: "Kontejner",
                column: "BrodID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kontejner");

            migrationBuilder.DropTable(
                name: "Brod");

            migrationBuilder.DropTable(
                name: "Luka");
        }
    }
}
