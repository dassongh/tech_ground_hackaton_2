import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MapObjectType, StreetType } from '../modules/mapObject/enum';
import ObjectAttribute from './objectAttribute';

@Entity()
export default class MapObject {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: false })
	isDefault: boolean;

	@Column({ type: 'numeric', precision: 10, scale: 8 })
	latitude: number;

	@Column({ type: 'numeric', precision: 11, scale: 8 })
	longitude: number;

	@Column()
	title: string;

	@Column({ type: 'enum', enum: MapObjectType })
	type: MapObjectType;

	@Column()
	city: string;

	@Column({ type: 'enum', enum: StreetType })
	street_type: StreetType;

	@Column()
	street_name: string;

	@Column({ nullable: true })
	building: string;

	@Column({ nullable: true })
	campus: string;

	@Column({ nullable: true })
	phone: string;

	@Column({ nullable: true })
	website: string;

	@ManyToMany(() => ObjectAttribute, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
	@JoinTable()
	attributes: ObjectAttribute[];
}
