import { MigrationInterface, QueryRunner } from "typeorm";

export class jolocom1666529569690 implements MigrationInterface {
    name = 'jolocom1666529569690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_meta_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "hasJoinedInvitation" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);

        // manual inserts as auto migrations don't work somehow...
        await queryRunner.query(`INSERT INTO "user_meta_entity"("id", "hasJoinedInvitation", "createdAt", "updatedAt") SELECT "id", "hasJoinedInvitation", "createdAt", "updatedAt" FROM "user_entity"`);

        await queryRunner.query(`CREATE TABLE "temporary_user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user_entity"("id", "name", "email") SELECT "id", "name", "email" FROM "user_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_entity" RENAME TO "user_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "metadataId" integer, CONSTRAINT "UQ_e2db387693c9e097e2a4b4d438f" UNIQUE ("metadataId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_entity"("id", "name", "email") SELECT "id", "name", "email" FROM "user_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_entity" RENAME TO "user_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "metadataId" integer, CONSTRAINT "UQ_e2db387693c9e097e2a4b4d438f" UNIQUE ("metadataId"), CONSTRAINT "FK_0b85e39030063dd14b13897d54e" FOREIGN KEY ("metadataId") REFERENCES "user_meta_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
       
        // manual insert foreign key here as auto migrations don't work somehow...
        await queryRunner.query(`INSERT INTO "temporary_user_entity"("id", "name", "email", "metadataId") SELECT "id", "name", "email", "id" FROM "user_entity"`);

        // original
        // await queryRunner.query(`INSERT INTO "temporary_user_entity"("id", "name", "email", "metadataId") SELECT "id", "name", "email", "metadataId" FROM "user_entity"`);
       
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_entity" RENAME TO "user_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME TO "temporary_user_entity"`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "metadataId" integer, CONSTRAINT "UQ_e2db387693c9e097e2a4b4d438f" UNIQUE ("metadataId"))`);
        await queryRunner.query(`INSERT INTO "user_entity"("id", "name", "email", "metadataId") SELECT "id", "name", "email", "metadataId" FROM "temporary_user_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_user_entity"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME TO "temporary_user_entity"`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user_entity"("id", "name", "email") SELECT "id", "name", "email" FROM "temporary_user_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_user_entity"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME TO "temporary_user_entity"`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "hasJoinedInvitation" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "user_entity"("id", "name", "email") SELECT "id", "name", "email" FROM "temporary_user_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_user_entity"`);
        await queryRunner.query(`DROP TABLE "user_meta_entity"`);
    }

}
