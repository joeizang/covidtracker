import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CovidCountryData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", length: 100 })
  country!: string;

  @Column({ type: "text", length: 5 })
  code!: string;

  @Column({ nullable: true })
  confirmed: number;

  @Column({ nullable: true })
  recovered: number;

  @Column({ nullable: true })
  critical: number;

  @Column({ nullable: true })
  deaths: number;

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;

  @Column()
  lastChange: Date;

  @Column()
  lastUpdate: Date;

  @Column({ type: "text", length: 150 })
  flag!: string;
}
