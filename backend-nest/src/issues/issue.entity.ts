import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'open' })
  status: 'open' | 'closed';

  @ManyToOne(() => Project, (project) => project.issues)
  project: Project;
}
