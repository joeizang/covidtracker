import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CovidCountryData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", length: 100 })
  country!: string;

  @Column({ type: "text", length: 5 })
  code!: string;

  @Column()
  confirmed: number;

  @Column()
  recovered: number;

  @Column()
  critical: number;

  @Column()
  deaths: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  lastChange: Date;

  @Column()
  lastUpdate: Date;

  @Column({ type: "text", length: 150 })
  flag!: string;
}
