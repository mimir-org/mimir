using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class LibraryTypeRdsIdFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"UPDATE LibraryType SET RdsId = 'BPA', RdsName = 'Absolute pressure transmitter' WHERE RdsId = 'B5E8278894A26D4593C5206089D2C8B3';
                        UPDATE LibraryType SET RdsId = 'HSB', RdsName = 'Absorbing System' WHERE RdsId = '5F90787D55E148D690104197405B00C4';
                        UPDATE LibraryType SET RdsId = 'GAA', RdsName = 'AC Generating System' WHERE RdsId = '219925464CED932F154DE60550963043';
                        UPDATE LibraryType SET RdsId = 'HSC', RdsName = 'Adsorbing System' WHERE RdsId = 'AFD4361D0358B3744896C0F9B9122C88';
                        UPDATE LibraryType SET RdsId = 'HMB', RdsName = 'Centrifuge Separating System' WHERE RdsId = 'EEB5A34A2537A05E37B3350763C6329E';
                        UPDATE LibraryType SET RdsId = 'SE', RdsName = 'Chemical - electrical conversion system' WHERE RdsId = '9AC9483F1FFA85ED1F96B4E01A8A24A5';
                        UPDATE LibraryType SET RdsId = 'SD', RdsName = 'Chemical - enthalpy conversion system' WHERE RdsId = '5493D4121A5CADDA3C3D3F0702EB4B34';
                        UPDATE LibraryType SET RdsId = 'HXA', RdsName = 'Chemical reactor' WHERE RdsId = '6E87DD364C4A9546B9DD4CCE75618D04';
                        UPDATE LibraryType SET RdsId = 'QAB', RdsName = 'Circuit breaker, electrical circuit control' WHERE RdsId = '162CE7BDAF1176504F10BFEC62955EF9';
                        UPDATE LibraryType SET RdsId = 'FCB', RdsName = 'Circuit-breaker, overcurrent' WHERE RdsId = '46925A1BDE254B821778F9A3A5E4E50C';
                        UPDATE LibraryType SET RdsId = 'XG', RdsName = 'Communication  Interface' WHERE RdsId = '0FB2EEFDAD3C608552828FF25DF6EC44';
                        UPDATE LibraryType SET RdsId = 'WG', RdsName = 'Communication Transport' WHERE RdsId = '21C044473B0ED4047F64EF4E41800621';
                        UPDATE LibraryType SET RdsId = 'EAA', RdsName = 'Connecting space' WHERE RdsId = '6C0B8B847C2EAF7AEE91412D7A55F365';
                        UPDATE LibraryType SET RdsId = 'QNA', RdsName = 'Control valve, fluid regulation control' WHERE RdsId = '57E1D87E41CD42046EF220087159D3B1';
                        UPDATE LibraryType SET RdsId = 'EQB', RdsName = 'Cooling panel (condenser)' WHERE RdsId = '84D478C775156D9A4B51FE4997E39D06';
                        UPDATE LibraryType SET RdsId = 'HMC', RdsName = 'Cyclone Separating System' WHERE RdsId = 'D214E6E02CD8E80B0B9B9143275943C5';
                        UPDATE LibraryType SET RdsId = 'GAB', RdsName = 'DC Generating System' WHERE RdsId = '1A07B385351F01D42F73C5FDA0FB262F';
                        UPDATE LibraryType SET RdsId = 'TAB', RdsName = 'DC/DC Converting System' WHERE RdsId = '8213C6732B4014199EC2004817E9B346';
                        UPDATE LibraryType SET RdsId = 'MSB', RdsName = 'Diesel Drive System' WHERE RdsId = '27086077A68E9FE46CC06149C49188D3';
                        UPDATE LibraryType SET RdsId = 'BPC', RdsName = 'Differential pressure transmitter' WHERE RdsId = '16C87C3B8BBD0FECBF8BBD52013783D1';
                        UPDATE LibraryType SET RdsId = 'BBH', RdsName = 'Disposal entity' WHERE RdsId = '59366BB1FDD43B517BB4873779871BAB';
                        UPDATE LibraryType SET RdsId = 'HPB', RdsName = 'Distillation System' WHERE RdsId = '85D70B2B6C801FBDB7B1EE80782AC682';
                        UPDATE LibraryType SET RdsId = 'BBB', RdsName = 'Drilling entity' WHERE RdsId = '756FF5C01EBFD62D1E6D7D21F4B7169B';
                        UPDATE LibraryType SET RdsId = 'A', RdsName = 'Drilling system' WHERE RdsId = '0C6517D48A1878351B6112F35CF8DDCC';
                        UPDATE LibraryType SET RdsId = 'HPA', RdsName = 'Drying System' WHERE RdsId = 'CB331525A64A965ED561904D8DB115F7';
                        UPDATE LibraryType SET RdsId = 'XEE', RdsName = 'Earth connection' WHERE RdsId = 'BD8F532D1942AAE825A394B89EBD3CF9';
                        UPDATE LibraryType SET RdsId = 'EBA', RdsName = 'Electric boiler' WHERE RdsId = 'D31EE19133019954BD22A30FC65A1B61';
                        UPDATE LibraryType SET RdsId = 'MMA', RdsName = 'AC Electric Motor System' WHERE RdsId = '23FD655BB65709A6766DCDE22D328300';
                        UPDATE LibraryType SET RdsId = 'QD', RdsName = 'Electrical energy storage system' WHERE RdsId = '856BD84D467214E161572985D142D46C';
                        UPDATE LibraryType SET RdsId = 'HD', RdsName = 'Electrical Power Supply System' WHERE RdsId = 'F246E9DEA33904139F8C46C034D03FEE';
                        UPDATE LibraryType SET RdsId = 'JD', RdsName = 'Electrical power transport/distribution system' WHERE RdsId = '16EF21B3B2B980D8257F22C967496872';
                        UPDATE LibraryType SET RdsId = 'RAC', RdsName = 'Electrical resistor' WHERE RdsId = '25E57E3061F6E0E4453F8D98EE5F661E';
                        UPDATE LibraryType SET RdsId = 'HRA', RdsName = 'Electrostatic Separation System' WHERE RdsId = '5C835A1AD40E6A2E98B298D436074FC0';
                        UPDATE LibraryType SET RdsId = 'DAA', RdsName = 'Equipment space' WHERE RdsId = '1EE6C1F93C29F36361D17F53C0EBD3EE';
                        UPDATE LibraryType SET RdsId = 'FLE', RdsName = 'Expansion tank' WHERE RdsId = 'B897DF0B109C3F509348321D5934955E';
                        UPDATE LibraryType SET RdsId = 'G', RdsName = 'Fixation system' WHERE RdsId = 'F191DAAD41EB825937D8DE96E44480CB';
                        UPDATE LibraryType SET RdsId = 'HVB', RdsName = 'Flocculator' WHERE RdsId = '96F5DDD7BCEF2670604C894692210367';
                        UPDATE LibraryType SET RdsId = 'KA', RdsName = 'Flow controlling system' WHERE RdsId = 'DECBC164E0AC02465CBAFF57039931F1';
                        UPDATE LibraryType SET RdsId = 'BFA', RdsName = 'Flow transmitter' WHERE RdsId = '843E34EE900463D5AF39BC05E5097249';
                        UPDATE LibraryType SET RdsId = 'XM', RdsName = 'Fluid closed conduit  Interface' WHERE RdsId = '5B4BAF0A5D1F82FC8F0A91C707FD1686';
                        UPDATE LibraryType SET RdsId = 'WP', RdsName = 'Fluid closed conduit Transport' WHERE RdsId = '771BE7A54D3745DF36526BC2062C832D';
                        UPDATE LibraryType SET RdsId = 'XK', RdsName = 'Fluid open conduit  Interface' WHERE RdsId = '8FF3B789760C0DAD284CE579409F0EA1';
                        UPDATE LibraryType SET RdsId = 'WM', RdsName = 'Fluid open conduit Transport' WHERE RdsId = '71EC61C1F91C4062E9A2B41506B05260';
                        UPDATE LibraryType SET RdsId = 'QA', RdsName = 'Fluid storage system' WHERE RdsId = '1486C79BB9A882FB4C68B877B5DDE0E2';
                        UPDATE LibraryType SET RdsId = 'HA', RdsName = 'Fluid supply system' WHERE RdsId = '970AC1F21E98EECC2E682BB866B84EBE';
                        UPDATE LibraryType SET RdsId = 'TAC', RdsName = 'Frequency converter, electrical' WHERE RdsId = '4A9D76E4E4B20A00EE325A88D1A83C0D';
                        UPDATE LibraryType SET RdsId = 'FCA', RdsName = 'Fuse, overcurrent' WHERE RdsId = 'B0D73C1B7491226BEE8D9E2B9182A1FA';
                        UPDATE LibraryType SET RdsId = 'GQA', RdsName = 'Reciprocating Compressing System' WHERE RdsId = '69E2F13B96B2BD2455EEDB1F834B8B0C';
                        UPDATE LibraryType SET RdsId = 'MLE', RdsName = 'Expander System' WHERE RdsId = 'A98D7A767B1B31B1DCE31896D17415A0';
                        UPDATE LibraryType SET RdsId = 'TLA', RdsName = 'Gear, mechanical' WHERE RdsId = 'EE4213D1BA85B7A5C8FABBEF6E97999A';
                        UPDATE LibraryType SET RdsId = 'EGC', RdsName = 'Heat Exchange System' WHERE RdsId = '6FEBCFD58B4A91B18EB56E0AF7668098';
                        UPDATE LibraryType SET RdsId = 'XB', RdsName = 'High Voltage  Interface' WHERE RdsId = '70D0B214CDBCF057A44E0B61D1BB0C15';
                        UPDATE LibraryType SET RdsId = 'WB', RdsName = 'High Voltage Transport' WHERE RdsId = 'C48DCD574DB8B731EEB8E2101060213F';
                        UPDATE LibraryType SET RdsId = 'J', RdsName = 'Infrastructure system' WHERE RdsId = '06CB0EF057521A4EDA16997792B16EFA';
                        UPDATE LibraryType SET RdsId = 'BBJ', RdsName = 'Injection entity' WHERE RdsId = '0812F3199A3B1099B809217B23FD3E8E';
                        UPDATE LibraryType SET RdsId = 'E', RdsName = 'Injection system' WHERE RdsId = 'B778A33CCC7989EF637D6978EC58185F';
                        UPDATE LibraryType SET RdsId = 'RQA', RdsName = 'Insulation, thermal' WHERE RdsId = '90C2DCC7D90DC3EFBD84790A494DD93C';
                        UPDATE LibraryType SET RdsId = 'BBA', RdsName = 'Integrated extraction entity' WHERE RdsId = '4A85FBD013F93DA5CBD222F327CF0EB3';
                        UPDATE LibraryType SET RdsId = 'W', RdsName = 'Interconnection complex' WHERE RdsId = '5F3633E900F0312223B2506A71E83EEB';
                        UPDATE LibraryType SET RdsId = 'TBB', RdsName = 'Electrical Inverting System (DC-AC)' WHERE RdsId = '90D2219617591DEECFA0D6DDA23E5BF7';
                        UPDATE LibraryType SET RdsId = 'HSA', RdsName = 'Ion Exchange System' WHERE RdsId = 'CD1DBAC1AC4562F01ACF5FB8864404D1';
                        UPDATE LibraryType SET RdsId = 'BLA', RdsName = 'Level transmitter' WHERE RdsId = '8721C49AAA79401999716E5E1406C0F2';
                        UPDATE LibraryType SET RdsId = 'GPB', RdsName = 'Centrifugal Pumping System' WHERE RdsId = '2A62DDF260DD82D64222D8CB91079160';
                        UPDATE LibraryType SET RdsId = 'XD', RdsName = 'Low Voltage  Interface' WHERE RdsId = '9A3A6B9E63BF8BFE299413CCEEA3F00E';
                        UPDATE LibraryType SET RdsId = 'WD', RdsName = 'Low Voltage Transport' WHERE RdsId = 'FAB5929F1C76515CB98E552A86CA6076';
                        UPDATE LibraryType SET RdsId = 'BBG', RdsName = 'Matter storage entity' WHERE RdsId = '913E5C58FA2CACDBF1C76DA9FB5B5B4A';
                        UPDATE LibraryType SET RdsId = 'SA', RdsName = 'Mechanical - electrical conversion system' WHERE RdsId = '28A68F3620110D9C21FDC5549923BB72';
                        UPDATE LibraryType SET RdsId = 'SC', RdsName = 'Mechanical - enthalpy conversion system' WHERE RdsId = 'BDDCF187EB7A041F91C6C30A6F035C44';
                        UPDATE LibraryType SET RdsId = 'SB', RdsName = 'Mechanical - pressure - kinetic conversion system' WHERE RdsId = '70FC01BFE0B51CE56E651C6C7A22FFF4';
                        UPDATE LibraryType SET RdsId = 'XN', RdsName = 'Mechanical energy  Interface' WHERE RdsId = '3829F4685F182C535623F325F859B918';
                        UPDATE LibraryType SET RdsId = 'HE', RdsName = 'Mechanical energy supply system' WHERE RdsId = '083E4B2F46EBF2CEEF0471DD0F7AD07A';
                        UPDATE LibraryType SET RdsId = 'WQ', RdsName = 'Mechanical energy Transport ' WHERE RdsId = 'E47ACF341E8195817EC800263DE28888';
                        UPDATE LibraryType SET RdsId = 'JE', RdsName = 'Electrical Power Distribution System' WHERE RdsId = '6B42967EF0632DD92C71C92218E07B73';
                        UPDATE LibraryType SET RdsId = 'HWA', RdsName = 'Kneading System' WHERE RdsId = 'EE68BD66270B9098DACF547C27C7A8D4';
                        UPDATE LibraryType SET RdsId = 'KD', RdsName = 'Mixing system' WHERE RdsId = '4A8B689F327A1471CA71ADA2DFD5BAD9';
                        UPDATE LibraryType SET RdsId = 'XZ', RdsName = 'Multiple kinds combined  Interface' WHERE RdsId = '961661D073DDA2A5254F21727F7FF9C3';
                        UPDATE LibraryType SET RdsId = 'WZ', RdsName = 'Multiple kinds combined Transport' WHERE RdsId = '3E54BDEBD3545FF7C0E4CA8A5F66AF82';
                        UPDATE LibraryType SET RdsId = 'RQC', RdsName = 'Noise barrier' WHERE RdsId = '6CFFC25242F0F280760422F9776BD409';
                        UPDATE LibraryType SET RdsId = 'RMA', RdsName = 'Non-return valve, fluid one-way barrier' WHERE RdsId = '57AADE0440D91AF54999CA7BD1E71CA3';
                        UPDATE LibraryType SET RdsId = 'Z', RdsName = 'Offshore complex' WHERE RdsId = '7F404D4D171293A4C84F66A3A0CFA779';
                        UPDATE LibraryType SET RdsId = 'Y', RdsName = 'Onshore complex' WHERE RdsId = 'B38522419AF4557A282BF3A20CD492F1';
                        UPDATE LibraryType SET RdsId = 'CLA', RdsName = 'Pool' WHERE RdsId = '257E2E24F9CE646BBF33D4ADC7CFEA44';
                        UPDATE LibraryType SET RdsId = 'BGA', RdsName = 'Position transmitter' WHERE RdsId = 'B3C09BB1946DC877584031F8058DFA16';
                        UPDATE LibraryType SET RdsId = 'GPA', RdsName = 'Positive Displacement Pumping System' WHERE RdsId = 'BC556EF10513B2CE466BB5A22D7F1B1C';
                        UPDATE LibraryType SET RdsId = 'BBF', RdsName = 'Processing entity' WHERE RdsId = '37563B331D9CFC4B99F7F5065BA0493E';
                        UPDATE LibraryType SET RdsId = 'PAA', RdsName = 'Processing space' WHERE RdsId = '44014D2456A19126F5797E5514C0B82A';
                        UPDATE LibraryType SET RdsId = 'D', RdsName = 'Processing system' WHERE RdsId = '3F4FABFB8F2D68FE92F87C73BB628B49';
                        UPDATE LibraryType SET RdsId = 'B', RdsName = 'Production system' WHERE RdsId = 'ECF6ADF0049C6BF878B71C6A6CD10427';
                        UPDATE LibraryType SET RdsId = 'KE', RdsName = 'Pumping system' WHERE RdsId = 'F44EFE7C487F424DE0B0F2933AFBA747';
                        UPDATE LibraryType SET RdsId = 'CCA', RdsName = 'Rechargeable battery' WHERE RdsId = 'DD603A7A0ED7EF41FC3FA9117BC5C380';
                        UPDATE LibraryType SET RdsId = 'TBA', RdsName = 'Electrical Rectifying System (AC-DC)' WHERE RdsId = '7ABC0FB169E0CDDD4DB4677A3060713F';
                        UPDATE LibraryType SET RdsId = 'BBE', RdsName = 'Routing entity' WHERE RdsId = '29A25D526A8201850648F02E32C444A9';
                        UPDATE LibraryType SET RdsId = 'FLD', RdsName = 'Rupture disc' WHERE RdsId = '5CB0A1397C5F7AFE9E2B48801632ADA5';
                        UPDATE LibraryType SET RdsId = 'FLB', RdsName = 'Safety damper' WHERE RdsId = '55FA92484FE5C994D7FADFD2E51C4B93';
                        UPDATE LibraryType SET RdsId = 'H', RdsName = 'Safety system' WHERE RdsId = 'F86483077B5E06B22210D42E379B7703';
                        UPDATE LibraryType SET RdsId = 'FLA', RdsName = 'Safety valve' WHERE RdsId = '60EC36D267D7C9ABA7665AF412F05BA5';
                        UPDATE LibraryType SET RdsId = 'KC', RdsName = 'Separation system' WHERE RdsId = '3F7AFF894437823FAD33FD6B3CA8D440';
                        UPDATE LibraryType SET RdsId = 'HMA', RdsName = 'Gravitational Separating System' WHERE RdsId = '01B9C2CD73A91F39916EF5AD2D428EC8';
                        UPDATE LibraryType SET RdsId = 'JA', RdsName = 'Fluid Transportation System' WHERE RdsId = '87FD3088146C16AB702B17872A10EFFF';
                        UPDATE LibraryType SET RdsId = 'QMA', RdsName = 'Shutoff valve, fluid on/off control' WHERE RdsId = '36F8543F49705B7E4B8B6926351CC179';
                        UPDATE LibraryType SET RdsId = 'KG', RdsName = 'Signal transformer system' WHERE RdsId = '01501C14F3073D6C1140B7BB1BAC56D8';
                        UPDATE LibraryType SET RdsId = 'ULQ', RdsName = 'Skid, Package foundation' WHERE RdsId = '1174AA7EC8C5552564EFEE91F6DBE51F';
                        UPDATE LibraryType SET RdsId = 'HC', RdsName = 'Solid matter supply system' WHERE RdsId = '5C6FB4E933147656DE0165EC7FB2CD8F';
                        UPDATE LibraryType SET RdsId = 'KH', RdsName = 'Solid matter transformation system' WHERE RdsId = '0D37E0F7CB9EA8E5EC021A196FF0F5B7';
                        UPDATE LibraryType SET RdsId = 'JC', RdsName = 'Solid Material Transportation System' WHERE RdsId = '511BAAA981C1E2572455F6D79EF8CF65';
                        UPDATE LibraryType SET RdsId = 'CAA', RdsName = 'Storage space' WHERE RdsId = '940693237933FBEB302435D4D882A2C3';
                        UPDATE LibraryType SET RdsId = 'F', RdsName = 'Storage system' WHERE RdsId = '0D3A292C8D17F7E9CD223C712348C02A';
                        UPDATE LibraryType SET RdsId = 'CMA', RdsName = 'Tank' WHERE RdsId = 'A671D6DB6B95F0F91B39F62FDE175647';
                        UPDATE LibraryType SET RdsId = 'BTA', RdsName = 'Temperature transmitter' WHERE RdsId = 'D0EEA22E880C315F11183E9E2FBCAE58';
                        UPDATE LibraryType SET RdsId = 'XV', RdsName = 'Thermal energy  Interface' WHERE RdsId = '109FC5E9DA01CCA13F5740B8AE34B1BC';
                        UPDATE LibraryType SET RdsId = 'QF', RdsName = 'Thermal energy storage system' WHERE RdsId = '4F331F2B91D3087CC4A74194E9DFABF5';
                        UPDATE LibraryType SET RdsId = 'HF', RdsName = 'Thermal Energy Supply System' WHERE RdsId = '4925E872414D5468DD26C9B51BB4481D';
                        UPDATE LibraryType SET RdsId = 'WV', RdsName = 'Thermal energy Transport' WHERE RdsId = '148ECB426374B67E6FEBE75D05CE6225';
                        UPDATE LibraryType SET RdsId = 'JF', RdsName = 'Thermal energy transport/distribution system' WHERE RdsId = '6CB91193FB923937007784EEF0D987FF';
                        UPDATE LibraryType SET RdsId = 'KB', RdsName = 'Threshold controlling system' WHERE RdsId = '872F25EDDC3A6BED069C1F8F2E26ABA8';
                        UPDATE LibraryType SET RdsId = 'TLB', RdsName = 'Torque converter' WHERE RdsId = 'BDF7A36AA49C1074D4CBD70A0316CC51';
                        UPDATE LibraryType SET RdsId = 'TAA', RdsName = 'Electrical Transforming System' WHERE RdsId = '50DEFF87348E14AC1AC779E62424722C';
                        UPDATE LibraryType SET RdsId = 'KF', RdsName = 'Transforming system' WHERE RdsId = '4FDF561E45A0FE6EABD40AB8D8995EAA';
                        UPDATE LibraryType SET RdsId = 'X', RdsName = 'Transition complex' WHERE RdsId = 'F53BD5B9FD02D71C1FFEE2E68508E2D0';
                        UPDATE LibraryType SET RdsId = 'BBD', RdsName = 'Transportation entity' WHERE RdsId = '9F309211A4D9A6408EAD464511F519D7';
                        UPDATE LibraryType SET RdsId = 'C', RdsName = 'Transportation system' WHERE RdsId = 'F212A4FCD0A83D9E0524871C63C0AB48';
                        UPDATE LibraryType SET RdsId = 'AAA', RdsName = 'Underground reservoir' WHERE RdsId = '226A13C8A0324DD7D4CE3937A038C56B';
                        UPDATE LibraryType SET RdsId = 'BBC', RdsName = 'Well interface entity' WHERE RdsId = '1C725E2B9B1902239B8849B8120A2F4E';
                        UPDATE LibraryType SET RdsId = 'BAA', RdsName = 'Working space' WHERE RdsId = 'CC0586F2B1C539ECCF8CA9EEB786E8A8';
                        delete from Rds where LEN(Id) > 5";

            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}