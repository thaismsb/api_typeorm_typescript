"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser1645584080472 = void 0;
const typeorm_1 = require("typeorm");
class CreateUser1645584080472 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "birthDate",
                    type: "Date",
                    isNullable: true,
                },
                {
                    name: "userName",
                    type: "varchar",
                    isUnique: true,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("users");
    }
}
exports.CreateUser1645584080472 = CreateUser1645584080472;
