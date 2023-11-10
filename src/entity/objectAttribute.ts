import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ObjectAttribute {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	type: string;
}
